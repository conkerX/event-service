import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import eventRoutes from "./api/eventRoutes";

// Load environment variables
dotenv.config();

// Initialize Prisma client
const prisma = new PrismaClient();

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());

// Routes
app.use("/api", eventRoutes);

// Test route
app.get("/", async (req, res) => {
  res.json({ message: "Event tracking service is running" });
});

// Start the server
async function main() {
  try {
    // Connect to the database
    await prisma.$connect();
    console.log("Connected to the database");

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Handle shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down...");
  await prisma.$disconnect();
  process.exit(0);
});

main();
