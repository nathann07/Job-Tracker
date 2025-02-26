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
      <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow">
        <input
          type="text"
          placeholder="Company"
          className="border p-2 w-full mb-2"
          value={job.company}
          onChange={(e) => setJob({ ...job, company: e.target.value })}
          required
        ></input>
        <input
          type="text"
          placeholder="Role"
          className="border p-2 w-full mb-2"
          value={job.role}
          onChange={(e) => setJob({ ...job, role: e.target.value })}
          required
        ></input>
        <select
          className="border p-2 w-full mb-2"
          value={job.status}
          onChange={(e) => setJob({ ...job, status: e.target.value })}
          >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default JobForm;
