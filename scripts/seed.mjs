import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://127.0.0.1:27017";
const dbName = "employee_directory";

const client = new MongoClient(uri);

async function seed() {
  await client.connect();
  const db = client.db(dbName);

  await db.collection("employees").deleteMany({});
  await db.collection("departments").deleteMany({});

  const departments = [
    { _id: new ObjectId(), name: "Engineering", floor: 5 },
    { _id: new ObjectId(), name: "Human Resources", floor: 2 },
    { _id: new ObjectId(), name: "Finance", floor: 3 },
    { _id: new ObjectId(), name: "Marketing", floor: 4 },
  ];

  await db.collection("departments").insertMany(departments);

  await db.collection("employees").insertMany([
    {
      name: "Mukesh Annamalai",
      position: "Frontend Developer",
      salary: 70000,
      departmentId: departments[0]._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Mira Dutta",
      position: "HR Manager",
      salary: 65000,
      departmentId: departments[1]._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Rohan Ghosh",
      position: "Financial Analyst",
      salary: 72000,
      departmentId: departments[2]._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  console.log("Database seeded successfully.");
  await client.close();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});