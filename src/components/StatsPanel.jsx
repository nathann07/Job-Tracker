import { motion } from "framer-motion";
import { TiDelete } from "react-icons/ti";

const StatsPanel = ({ jobs, isOpen, togglePanel }) => {
  const totalJobs = jobs.length;
  const statusCounts = jobs.reduce((counts, job) => {
    counts[job.status] = (counts[job.status] || 0) + 1;
    return counts;
  }, {});

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 right-0 h-full w-64 bg-gray-300 dark:bg-gray-800 dark:text-white shadow-lg p-6 z-50"
    >
      <button
        className="absolute top-3 right-3 text-4xl text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded"
        onClick={togglePanel}
      >
        <TiDelete/>
      </button>
      <h2 className="text-xl font-bold mb-4">📊 Job Statistics</h2>
      <p><strong>Total Applications:</strong> {totalJobs}</p>
      <p className="text-blue-400"><strong>Applied:</strong> {statusCounts["Applied"] || 0}</p>
      <p className="text-yellow-600 dark:text-yellow-400"><strong>Interview:</strong> {statusCounts["Interview"] || 0}</p>
      <p className="text-green-600 dark:text-green-400"><strong>Offer:</strong> {statusCounts["Offer"] || 0}</p>
      <p className="text-red-400"><strong>Rejected:</strong> {statusCounts["Rejected"] || 0}</p>
    </motion.div>
  );
};

export default StatsPanel;
