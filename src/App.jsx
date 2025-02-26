import { useState, useEffect } from "react";
import Header from "./components/Header";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

const App = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    if (savedJobs.length > 0) {
      setJobs(savedJobs);
    }
  }, []);

  useEffect(() => {
    if (jobs.length > 0) {
      localStorage.setItem("jobs", JSON.stringify(jobs));
    }
  }, [jobs]);

  const addJob = (job) => {
    const newJob = { ...job, id: Date.now() };
    setJobs([...jobs, newJob]);
  };

  const deleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <Header />
      <div className="py-1"></div>
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <JobForm addJob={addJob} />
        <JobList jobs={jobs} deleteJob={deleteJob} />
      </div>
    </div>
  );
};

export default App;
