import { useState, useEffect } from "react";
import Header from "./components/Header";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import FilterBar from "./components/FilterBar";
import JobDetails from "./components/JobDetails"; // Updated reference
import HoverButton from "./components/HoverButton";
import StatsPanel from "./components/StatsPanel";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedJob, setSelectedJob] = useState(null); // Handles viewing details
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [statsOpen, setStatsOpen] = useState(false);

  const toggleStatsPanel = () => setStatsOpen(!statsOpen);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    if (savedJobs.length > 0) {
      setJobs(savedJobs);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  const addJob = (job) => {
    const newJob = { ...job, id: Date.now() };
    setJobs([...jobs, newJob]);
  };

  const deleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const viewJobDetails = (job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  const saveEdit = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === updatedJob.id ? { ...job, ...updatedJob } : job
      )
    );
    setSelectedJob(updatedJob);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <span className="flex space-x-4">
        <HoverButton
          message={darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          hoverMessage={darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          classes="bg-gray-300 dark:bg-gray-800 dark:text-white px-4 py-2 rounded my-4 shadow-lg"
          action={() => setDarkMode(!darkMode)}
        />
        <HoverButton
          message="📊 View Stats"
          hoverMessage="📊 View Stats"
          classes="bg-gray-300 dark:bg-gray-800 dark:text-white px-4 py-2 rounded my-4 shadow-lg"
          action={toggleStatsPanel}
        />
      </span>
      <div className="py-1"></div>
      <div className="w-full max-w-md bg-gray-300 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        {selectedJob ? (
          <JobDetails job={selectedJob} closeJobDetails={closeJobDetails} saveEdit={saveEdit} />
        ) : (
          <>
            <FilterBar filter={filter} setFilter={setFilter} sortOrder={sortOrder} setSortOrder={setSortOrder} />
            <JobForm addJob={addJob} />
            <JobList jobs={jobs} deleteJob={deleteJob} viewJobDetails={viewJobDetails} filter={filter} sortOrder={sortOrder} />
          </>
        )}
      </div>
      <StatsPanel jobs={jobs} isOpen={statsOpen} togglePanel={toggleStatsPanel} />
    </div>
  );
};

export default App;
