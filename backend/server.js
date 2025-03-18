import express from "express";
import cors from "cors";
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(cors());

const dbFilePath = "db.json";

// ✅ Ensure `db.json` exists before initializing LowDB
if (!fs.existsSync(dbFilePath)) {
    console.log("db.json not found! Creating default file...");
    fs.writeFileSync(dbFilePath, JSON.stringify({ jobs: [] }, null, 2));
}

// ✅ Initialize LowDB with a default structure
const adapter = new JSONFileSync(dbFilePath);
const db = new LowSync(adapter, { jobs: [] });

db.read();

// ✅ Ensure `db.data` is always initialized
if (!db.data || !db.data.jobs) {
    console.log("No data found in db.json! Initializing...");
    db.data = { jobs: [] };
    db.write();
}

// Fetch all jobs
app.get("/jobs", (req, res) => {
    db.read();
    res.json(db.data.jobs);
});

// Add a job
app.post("/jobs", (req, res) => {
    const newJob = { id: Date.now(), ...req.body };
    db.data.jobs.push(newJob);
    db.write();
    res.json(newJob);
});

// Edit a job
app.put("/jobs/:id", (req, res) => {
    db.read();
    const job = db.data.jobs.find(j => j.id == req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    Object.assign(job, req.body);
    db.write();
    res.json(job);
});

// Delete a job
app.delete("/jobs/:id", (req, res) => {
    db.read();
    db.data.jobs = db.data.jobs.filter(j => j.id != req.params.id);
    db.write();
    res.json({ success: true });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
