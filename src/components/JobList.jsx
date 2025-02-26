const JobList = ({ jobs, deleteJob }) => {
  return (
    <div className="mt-4 space-y-3">
      {jobs.length === 0 ? (
        <p className="text-gray-400 text-center">No jobs added yet.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className="p-4 bg-gray-700 rounded-md shadow flex justify-between items-center"
          >
            <span className="font-medium text-white">
              {job.company} - {job.role}
            </span>
            <span className="flex gap-2 items-center">
              <span
                className={`px-3 py-1 text-sm font-bold ${
                  job.status === "Applied"
                    ? "bg-blue-500"
                    : job.status === "Interview"
                    ? "bg-yellow-500"
                    : job.status === "Offer"
                    ? "bg-green-500"
                    : "bg-red-500"
                } text-white`}
              >
                {job.status}
              </span>
              <button
                className="px-2 bg-gray-500 text-white hover:bg-gray-200 hover:text-black rounded"
                onClick={() => deleteJob(job.id)}
              >
                X
              </button>
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
