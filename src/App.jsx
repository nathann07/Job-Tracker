import { useState, useEffect } from "react";
import Header from "./components/Header";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import FilterBar from "./components/FilterBar";
import EditJobForm from "./components/EditJobForm";
import HoverButton from "./components/HoverButton";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [editingJob, setEditingJob] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

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
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  


  const addJob = (job) => {
    const newJob = { ...job, id: Date.now() };
    setJobs([...jobs, newJob]);
  };

  const deleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const startEditing = (job) => {
    setEditingJob(job);
  };

  const saveEdit = (updatedJob) => {
    setJobs((prevJobs) => {
      return prevJobs.map((job) => 
        job.id === updatedJob.id ? { ...job, ...updatedJob } : job
      );
    });
    setEditingJob(null);
  };
  
  const cancelEdit = () => {
    setEditingJob(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <HoverButton
      message={darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      hoverMessage={darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      classes={`bg-gray-300 dark:bg-gray-800 dark:text-white px-4 py-2 rounded my-4 shadow-lg`}
      action={() => setDarkMode(!darkMode)}>
      </HoverButton>
      <div className="py-1"></div>
      <div className="w-full max-w-md bg-gray-300 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        {editingJob ? (
            <EditJobForm job={editingJob} saveEdit={saveEdit} cancelEdit={cancelEdit} />
          ) : (
            <>
              <FilterBar filter={filter} setFilter={setFilter} sortOrder={sortOrder} setSortOrder={setSortOrder} />
              <JobForm addJob={addJob} />
              <JobList jobs={jobs} deleteJob={deleteJob} startEditing={startEditing} filter={filter} sortOrder={sortOrder} />
            </>
          )}
      </div>
    </div>
  );
};

export default App;
