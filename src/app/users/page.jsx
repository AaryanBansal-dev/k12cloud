import clientPromise from "@/lib/mongodb";

// Add dynamic rendering configuration to prevent build-time database access
export const dynamic = "force-dynamic";

export default async function UsersPage() {
  try {
    const client = await clientPromise;
    const db = client.db("your-database-name");
    const users = await db.collection("users").find({}).limit(10).toArray();

    return (
      <div>
        <h1>Users</h1>
        <ul>
          {users.map((user) => (
            <li key={user._id.toString()}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch users:", error);

    // Show a friendly error message instead of failing the build
    return (
      <div>
        <h1>Users</h1>
        <p>Unable to load users at this time. Please try again later.</p>
        <p>Error details: {error.message}</p>
      </div>
    );
  }
}
