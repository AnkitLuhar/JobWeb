const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb"); // Import ObjectId
dotenv.config();

// Middleware
app.use(express.json()); // Parse incoming JSON request body
app.use(cors());

const PORT = process.env.PORT || 8000;

async function run() {
  try {
    // Connect to MongoDB
    const uri = process.env.MONGOURL;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const db = client.db("jobPortal");
    const jobCollections = db.collection("DemoJobData");

    // Post a job
    app.post("/post-job", async (req, res) => {
      try {
        const body = req.body;
        body.createAt = new Date();
        const result = await jobCollections.insertOne(body);
        if (result.insertedId) {
          return res.status(200).send(result);
        } else {
          return res
            .status(400)
            .send({ message: "Cannot insert data into the database" });
        }
      } catch (error) {
        console.error("Error posting job:", error);
        return res.status(500).send({ message: "Internal server error" });
      }
    });
    // Update a job
    app.patch("/update-job/:id", async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...jobData,
        },
      };
      const result = await jobCollections.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Get all jobs
    app.get("/all-jobs", async (req, res) => {
      try {
        const jobs = await jobCollections.find({}).toArray();
        res.send(jobs);
      } catch (error) {
        console.error("Error getting all jobs:", error);
        return res.status(500).send({ message: "Internal server error" });
      }
    });

    //get single job using id
    app.get("/all-jobs/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const job = await jobCollections.findOne({ _id: new ObjectId(id) });
        if (!job) {
          return res.status(404).send({ message: "Job not found" });
        }
        res.send(job);
      } catch (error) {
        console.error("Error getting job by ID:", error);
        return res.status(500).send({ message: "Internal server error" });
      }
    });

    // Get jobs by email
    app.get("/myJobs/:email", async (req, res) => {
      try {
        const jobs = await jobCollections
          .find({ postedBy: req.params.email })
          .toArray();
        res.send(jobs);
      } catch (error) {
        console.error("Error getting jobs by email:", error);
        return res.status(500).send({ message: "Internal server error" });
      }
    });

    // Delete a job
    app.delete("/job/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await jobCollections.deleteOne(filter);
        if (result.deletedCount === 1) {
          return res.status(200).send({ message: "Job deleted successfully" });
        } else {
          return res.status(404).send({ message: "Job not found" });
        }
      } catch (error) {
        console.error("Error deleting job:", error);
        return res.status(500).send({ message: "Internal server error" });
      }
    });

    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with a non-zero exit code to indicate failure
  }
}

run().catch(console.dir);

// Define a default route
app.get("/", (req, res) => {
  res.send("Hello Moto!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running `);
});
