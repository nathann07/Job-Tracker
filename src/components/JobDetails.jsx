import { useState } from "react";
import { motion } from "framer-motion";
import { TiDelete } from "react-icons/ti";

const JobDetails = ({ job, closeJobDetails, saveEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedJob, setUpdatedJob] = useState({ ...job });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEdit(updatedJob);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg"
    >
      {/* Header Section */}
      <div className="relative mb-4">
        {/* Company & Role */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white break-words overflow-hidden pr-39">
          {job.company} - {job.role}
        </h2>

        {/* Buttons (Edit & Close) */}
        <div className="absolute top-0 right-0 flex items-center space-x-2">
          <button
            className="bg-gray-400 text-white px-3 rounded hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 min-w-[105px] h-7"
            onClick={() => {
              setUpdatedJob(job);
              setIsEditing(!isEditing);
            }}
          >
            {isEditing ? "Cancel Edit" : "Edit"}
          </button>
          <button
            className="text-4xl text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400 rounded"
            onClick={closeJobDetails}
          >
            <TiDelete />
          </button>
        </div>
      </div>

      {/* Edit Mode */}
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <p>Company</p>
          <input
            type="text"
            className="border p-2 w-full mb-2 bg-white dark:bg-gray-700 dark:text-white"
            value={updatedJob.company}
            onChange={(e) => setUpdatedJob({ ...updatedJob, company: e.target.value })}
            required
          />
          <p>Role</p>
          <input
            type="text"
            className="border p-2 w-full mb-2 bg-white dark:bg-gray-700 dark:text-white"
            value={updatedJob.role}
            onChange={(e) => setUpdatedJob({ ...updatedJob, role: e.target.value })}
            required
          />
          <p>Status</p>
          <select
            className="border p-2 w-full mb-2 bg-white dark:bg-gray-700 dark:text-white"
            value={updatedJob.status}
            onChange={(e) => setUpdatedJob({ ...updatedJob, status: e.target.value })}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <p>{`Description (Optional)`}</p>
          <textarea
            className="border p-2 w-full mb-2 bg-white dark:bg-gray-700 dark:text-white"
            value={updatedJob.description || ""}
            onChange={(e) => setUpdatedJob({ ...updatedJob, description: e.target.value })}
            placeholder="Job Description (Optional)"
          ></textarea>
          <p>{`Posting URL (Optional)`}</p>
          <input
            type="url"
            className="border p-2 w-full mb-2 bg-white dark:bg-gray-700 dark:text-white"
            value={updatedJob.posting_link || ""}
            onChange={(e) => setUpdatedJob({ ...updatedJob, postingLink: e.target.value })}
            placeholder="Job Posting URL (Optional)"
          />
          <p>{`Posting Screenshot URL (Optional)`}</p>
          <input
            type="url"
            className="border p-2 w-full mb-2 bg-white dark:bg-gray-700 dark:text-white"
            value={updatedJob.resume_url || ""}
            onChange={(e) => setUpdatedJob({ ...updatedJob, screenshotUrl: e.target.value })}
            placeholder="Job Posting Screenshot URL (Optional)"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full rounded mt-2">
            Save Changes
          </button>
        </form>
      ) : (
        // Display Mode
        <div>
          <p className={`font-bold mb-4 ${job.status === "Applied"
            ? "text-blue-400"
            : job.status === "Interview"
              ? "text-yellow-600 dark:text-yellow-400"
              : job.status === "Offer"
                ? "text-green-600 dark:text-green-400"
                : "text-red-400"
            }`}>{job.status}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-3 break-words whitespace-pre-wrap">
            {job.description || "No description provided."}
          </p>

          {job.postingLink && (
            <a
              href={job.postingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 dark:text-blue-400 underline mb-3 block"
            >
              View Job Posting
            </a>
          )}
          {job.screenshotUrl && (
            <img
              src={job.screenshotUrl}
              alt="Job Posting Screenshot"
              className="rounded-lg shadow-md max-w-full h-auto mb-3"
            />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default JobDetails;
