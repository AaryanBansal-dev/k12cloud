import { NextResponse } from 'next/server';
import { runMongoDbDiagnostics, formatDiagnosticsResults } from '@/lib/networkDiagnostics';

export async function GET() {
  try {
    // Get the MongoDB URI from environment variables
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      return NextResponse.json(
        { error: 'MongoDB URI is not defined in environment variables' },
        { status: 500 }
      );
    }
    
    console.log('Running MongoDB connection diagnostics...');
    
    // Run the diagnostics
    const diagnosticResults = await runMongoDbDiagnostics(mongoUri);
    
    // Log formatted results to server console
    console.log(formatDiagnosticsResults(diagnosticResults));
    
    // Return sanitized results (without sensitive info)
    return NextResponse.json({
      success: diagnosticResults.success,
      timestamp: diagnosticResults.timestamp,
      dnsResolution: {
        success: diagnosticResults.tests.dns?.success || false,
        error: diagnosticResults.tests.dns?.error?.message || null
      },
      connectionTest: {
        success: diagnosticResults.tests.connection?.success || false,
        error: diagnosticResults.tests.connection?.error?.message || null
      },
      atlasStatus: {
        success: diagnosticResults.tests.atlasStatus?.success || false,
        error: diagnosticResults.tests.atlasStatus?.error?.message || null
      },
      recommendations: !diagnosticResults.success ? [
        'Check your internet connection',
        'Verify the MongoDB Atlas hostname in your connection string',
        'Make sure your IP address is whitelisted in MongoDB Atlas',
        'Check if MongoDB Atlas is experiencing any service issues: https://status.mongodb.com/'
      ] : []
    });
  } catch (error) {
    console.error('Error running diagnostics:', error);
    return NextResponse.json(
      { error: 'Failed to run MongoDB diagnostics', details: error.message },
      { status: 500 }
    );
  }
}