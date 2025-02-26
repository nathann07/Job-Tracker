const JobList = ({ jobs }) => (
  <div className="mt-4 space-y-3">
    {jobs.length === 0 ? (
      <p className="text-gray-400 text-center">No jobs added yet.</p>
    ) : (
      jobs.map((job, index) => (
        <div
          key={index}
          className="p-4 bg-gray-700 rounded-md shadow flex justify-between items-center"
        >
          <span className="font-medium text-white">{job.company} - {job.role}</span>
          <span className={`px-3 py-1 text-sm font-bold ${
            job.status === "Applied" ? "bg-blue-500" :
            job.status === "Interview" ? "bg-yellow-500" :
            job.status === "Offer" ? "bg-green-500" :
            "bg-red-500"
          } text-white`}>
            {job.status}
          </span>
        </div>
      ))
    )}
  </div>
);

export default JobList;