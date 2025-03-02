import { useState } from "react";

const JobForm = ({ addJob }) => {
  const [job, setJob] = useState({ company: "", role: "", status: "Applied" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addJob(job);
    setJob({ company: "", role: "", status: "Applied" });
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="p-4 rounded shadow bg-gray-100 dark:bg-gray-700">
        <input
          type="text"
          placeholder="Company"
          className="border p-3 w-full mb-3 text-lg bg-white dark:bg-gray-600 dark:text-white"
          value={job.company}
          onChange={(e) => setJob({ ...job, company: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Role"
          className="border p-3 w-full mb-3 text-lg bg-white dark:bg-gray-600 dark:text-white"
          value={job.role}
          onChange={(e) => setJob({ ...job, role: e.target.value })}
          required
        />
        <select
          className="border p-3 w-full mb-3 text-lg bg-white dark:bg-gray-600 dark:text-white"
          value={job.status}
          onChange={(e) => setJob({ ...job, status: e.target.value })}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded w-full text-lg">
          Add Job
        </button>
      </form>
    </div>
  );
};

export default JobForm;
