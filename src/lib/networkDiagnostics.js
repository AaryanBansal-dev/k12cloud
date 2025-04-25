/**
 * Network Diagnostics Utility
 *
 * This module provides functions to diagnose network connectivity issues,
 * particularly for MongoDB Atlas connections.
 */

import dns from "dns";
import { promisify } from "util";
import https from "https";

// Promisify DNS lookup
const dnsLookup = promisify(dns.lookup);
const dnsResolve = promisify(dns.resolve);

/**
 * Check if a hostname can be resolved via DNS
 * @param {string} hostname - The hostname to resolve
 * @returns {Promise<{success: boolean, addresses?: string[], error?: Error}>}
 */
export async function checkDnsResolution(hostname) {
  try {
    const addresses = await dnsResolve(hostname);
    return { success: true, addresses };
  } catch (error) {
    return { success: false, error };
  }
}

/**
 * Try to connect to a host on a specific port
 * @param {string} hostname - The hostname to connect to
 * @param {number} port - The port to connect to
 * @param {number} timeoutMs - Connection timeout in milliseconds
 * @returns {Promise<{success: boolean, timeMs?: number, error?: Error}>}
 */
export async function checkHostConnection(
  hostname,
  port = 443,
  timeoutMs = 5000
) {
  return new Promise((resolve) => {
    const startTime = Date.now();

    const req = https.request(
      {
        hostname,
        port,
        path: "/",
        method: "HEAD",
        timeout: timeoutMs,
      },
      (res) => {
        const timeMs = Date.now() - startTime;
        resolve({ success: true, statusCode: res.statusCode, timeMs });
      }
    );

    req.on("error", (error) => {
      resolve({ success: false, error });
    });

    req.on("timeout", () => {
      req.destroy();
      resolve({
        success: false,
        error: new Error(`Connection timed out after ${timeoutMs}ms`),
      });
    });

    req.end();
  });
}

/**
 * Parse MongoDB Atlas URI and extract cluster information
 * @param {string} uri - MongoDB URI string
 * @returns {Object} Parsed cluster information
 */
export function parseMongoUri(uri) {
  try {
    // Hide password in URI
    const redactedUri = uri.replace(/:([^:@]+)@/, ":****@");

    // Extract hostname
    const match = uri.match(/@([^,]+)(,|\/)/);
    if (!match) {
      return { success: false, error: "Could not extract hostname from URI" };
    }

    const primaryHost = match[1];
    const hostnameBase = primaryHost.split(".").slice(1).join(".");

    return {
      success: true,
      primaryHost,
      hostnameBase,
      redactedUri,
    };
  } catch (error) {
    return { success: false, error };
  }
}

/**
 * Run comprehensive network diagnostics for MongoDB Atlas
 * @param {string} mongoUri - The MongoDB connection URI
 * @returns {Promise<Object>} Diagnostics results
 */
export async function runMongoDbDiagnostics(mongoUri) {
  const results = {
    timestamp: new Date().toISOString(),
    tests: {},
  };

  // Parse the URI
  const parsedUri = parseMongoUri(mongoUri);
  if (!parsedUri.success) {
    return {
      success: false,
      error: "Failed to parse MongoDB URI",
      details: parsedUri.error,
    };
  }

  // Check DNS resolution for the hostname
  results.tests.dns = await checkDnsResolution(parsedUri.primaryHost);

  // If DNS resolution successful, try to connect
  if (results.tests.dns.success) {
    results.tests.connection = await checkHostConnection(parsedUri.primaryHost);
  }

  // Check if MongoDB Atlas status page is accessible
  results.tests.atlasStatus = await checkHostConnection("cloud.mongodb.com");

  // Overall result
  results.success =
    results.tests.dns.success && (results.tests.connection?.success ?? false);

  return results;
}

/**
 * Format diagnostics results as a string for logging
 * @param {Object} diagnostics - Results from runMongoDbDiagnostics
 * @returns {string} Formatted results
 */
export function formatDiagnosticsResults(diagnostics) {
  let output = `\n=== MongoDB Connection Diagnostics ===\n`;
  output += `Time: ${diagnostics.timestamp}\n\n`;

  if (diagnostics.tests.dns) {
    output += `DNS Resolution: ${
      diagnostics.tests.dns.success ? "✅ SUCCESS" : "❌ FAILED"
    }\n`;
    if (diagnostics.tests.dns.addresses) {
      output += `  Addresses: ${diagnostics.tests.dns.addresses.join(", ")}\n`;
    }
    if (diagnostics.tests.dns.error) {
      output += `  Error: ${diagnostics.tests.dns.error.message}\n`;
    }
    output += "\n";
  }

  if (diagnostics.tests.connection) {
    output += `Connection Test: ${
      diagnostics.tests.connection.success ? "✅ SUCCESS" : "❌ FAILED"
    }\n`;
    if (diagnostics.tests.connection.timeMs) {
      output += `  Response time: ${diagnostics.tests.connection.timeMs}ms\n`;
    }
    if (diagnostics.tests.connection.error) {
      output += `  Error: ${diagnostics.tests.connection.error.message}\n`;
    }
    output += "\n";
  }

  if (diagnostics.tests.atlasStatus) {
    output += `MongoDB Atlas Status: ${
      diagnostics.tests.atlasStatus.success ? "✅ SUCCESS" : "❌ FAILED"
    }\n`;
    if (diagnostics.tests.atlasStatus.success) {
      output += `  Atlas is reachable (${diagnostics.tests.atlasStatus.timeMs}ms)\n`;
    } else if (diagnostics.tests.atlasStatus.error) {
      output += `  Error: ${diagnostics.tests.atlasStatus.error.message}\n`;
    }
    output += "\n";
  }

  output += `Overall Diagnosis: ${
    diagnostics.success
      ? "✅ MongoDB should be accessible"
      : "❌ Connection issues detected"
  }\n`;

  if (!diagnostics.success) {
    output += "\nRecommendations:\n";
    if (!diagnostics.tests.dns?.success) {
      output += "- Check your internet connection\n";
      output += "- Verify the MongoDB Atlas hostname is correct\n";
      output += "- Try using a different DNS server or flush your DNS cache\n";
    } else if (!diagnostics.tests.connection?.success) {
      output += "- Check if your firewall is blocking outbound connections\n";
      output += "- Verify your MongoDB Atlas IP whitelist settings\n";
      output +=
        "- Ensure your network allows connections to MongoDB (port 27017)\n";
    }
    output += "- Check MongoDB Atlas status: https://status.mongodb.com/\n";
  }

  output += "\n==========================================\n";

  return output;
}

export default {
  checkDnsResolution,
  checkHostConnection,
  parseMongoUri,
  runMongoDbDiagnostics,
  formatDiagnosticsResults,
};
