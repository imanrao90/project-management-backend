// test.js
import 'dotenv/config';
import prisma from './configs/prisma.js';

async function createUserMock(data) {
  try {
    console.log("Creating user:", data.id);
    const user = await prisma.user.create({
      data: {
        id: data.id,
        email: data?.email_addresses[0]?.email_address,
        name: data?.first_name + " " + data?.last_name,
        image: data?.image_url || ""
      }
    });
    console.log("✅ User created:", user.id);
  } catch (error) {
    console.error("❌ Error creating user:", error);
  }
}

async function main() {
  console.log("🚀 Starting test script");

  try {
    // Test database connection
    const count = await prisma.user.count();
    console.log("Users in database:", count);

    // Run mock user creation
    const mockData = {
      id: "test-user-1",
      email_addresses: [{ email_address: "test@example.com" }],
      first_name: "Test",
      last_name: "User",
      image_url: ""
    };

    console.log("Running createUserMock...");
    await createUserMock(mockData);

  } catch (error) {
    console.error("❌ General error:", error);
  } finally {
    console.log("⏹ Test script finished");
    process.exit();
  }
}

main();
