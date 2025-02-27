import { useState } from "react";

const EditJobForm = ({ job, saveEdit, cancelEdit }) => {
  const [updatedJob, setUpdatedJob] = useState({ ...job });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEdit(updatedJob);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Company"
        className="border p-2 w-full mb-2 bg-gray-700 text-white"
        value={updatedJob.company}
        onChange={(e) => setUpdatedJob({ ...updatedJob, company: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Role"
        className="border p-2 w-full mb-2 bg-gray-700 text-white"
        value={updatedJob.role}
        onChange={(e) => setUpdatedJob({ ...updatedJob, role: e.target.value })}
        required
      />
      <select
        className="border p-2 w-full mb-2 bg-gray-700 text-white"
        value={updatedJob.status}
        onChange={(e) => setUpdatedJob({ ...updatedJob, status: e.target.value })}
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Save</button>
        <button type="button" className="bg-gray-500 text-white p-2 w-full" onClick={cancelEdit}>Cancel</button>
      </div>
    </form>
  );
};

export default EditJobForm;
