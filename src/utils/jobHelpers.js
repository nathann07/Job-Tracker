// clean job fields
export const cleanField = (value) => (value?.trim() === "" ? null : value);

// sort jobs
export const getSortedJobs = (jobList, sortOrder) => {
  return [...jobList].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOrder === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortOrder === "company") {
      return a.company.toLowerCase().localeCompare(b.company.toLowerCase());
    } else if (sortOrder === "role") {
      return a.role.toLowerCase().localeCompare(b.role.toLowerCase());
    }
    return 0;
  });
};

// filter
export const getFilteredAndSortedJobs = (jobs, filter, sortOrder) => {
  const filtered = filter === "All" ? jobs : jobs.filter(job => job.status === filter);
  return getSortedJobs(filtered, sortOrder);
};