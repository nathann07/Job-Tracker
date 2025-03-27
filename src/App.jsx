import { useState, useEffect } from "react";
import Header from "./components/Header";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import FilterBar from "./components/FilterBar";
import JobDetails from "./components/JobDetails"; // Updated reference
import HoverButton from "./components/HoverButton";
import StatsPanel from "./components/StatsPanel";
import AuthForm from "./components/AuthForm";
import { supabase } from "./supabaseClient";

const App = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedJob, setSelectedJob] = useState(null); // Handles viewing details
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [statsOpen, setStatsOpen] = useState(false);

  // user session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoadingUser(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);


  // fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      if (!user) return; // don't run if user variable is not ready

      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching jobs from Supabase:", error.message);
      } else {
        setJobs(data);
      }
    };

    fetchJobs();
  }, [user]);

  // dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  // clean field function
  const cleanField = (value) => (value?.trim() === "" ? null : value);

  // add job
  const addJob = async (job) => {
    const { data, error } = await supabase
      .from('jobs')
      .insert([{
        company: job.company,
        role: job.role,
        status: job.status,
        description: cleanField(job.description),
        posting_link: cleanField(job.postingLink),
        resume_url: cleanField(job.screenshotUrl),
        user_id: user.id,
      }])
      .select(); // returns the newly added job

    if (error) {
      console.error("Error adding job:", error.message);
      return;
    }

    setJobs([...jobs, ...data]); // use spread in case Supabase returns an array
  };

  // delete job
  const deleteJob = async (jobId) => {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', jobId);

    if (error) {
      console.error("Error deleting job:", error.message);
      return;
    }

    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const viewJobDetails = (job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  // update job
  const saveEdit = async (updatedJob) => {
    const { data, error } = await supabase
      .from('jobs')
      .update({
        company: updatedJob.company,
        role: updatedJob.role,
        status: updatedJob.status,
        description: cleanField(updatedJob.description),
        posting_link: cleanField(updatedJob.postingLink),
        resume_url: cleanField(updatedJob.screenshotUrl),
      })
      .eq('id', updatedJob.id)
      .select();

    if (error) {
      console.error("Error updating job:", error.message);
      return;
    }

    const updated = data[0];

    setJobs(jobs.map(job => job.id === updatedJob.id ? updated : job));

    setSelectedJob(updated);
  };

  const toggleStatsPanel = () => setStatsOpen(!statsOpen);

  if (loadingUser) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <AuthForm setUser={setUser} />;
  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <span className="flex space-x-4">
        <HoverButton
          message="🚪 Log Out"
          hoverMessage="🚪 Log Out"
          classes="bg-red-500 dark:bg-red-700 text-white px-4 py-2 rounded my-4 shadow-lg"
          action={async () => {
            await supabase.auth.signOut();
            setUser(null);
            setJobs([]); // clear job state on logout
          }}
        />
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
