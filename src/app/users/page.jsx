import clientPromise from "@/lib/mongodb";

export default async function UsersPage() {
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
}
