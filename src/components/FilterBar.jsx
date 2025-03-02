const FilterBar = ({ filter, setFilter, sortOrder, setSortOrder }) => {
  return (
    <div className="flex justify-between mb-4">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
      >
        <option value="All">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
};

export default FilterBar;
