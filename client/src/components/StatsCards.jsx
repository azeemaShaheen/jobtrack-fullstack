
import React from "react";

function StatsCards({ jobs, statuses, filter, setFilter }) {
  return (
    <div className="stats">
      {["All", ...statuses].map((status) => (
        <button
          key={status}
          className={"stat " + (filter === status ? "selected" : "")}
          onClick={() => setFilter(status)}
        >
          <span>
            {status === "All" ? "Total applications" : status}
          </span>

          <strong>
            {status === "All"
              ? jobs.length
              : jobs.filter((job) => job.status === status).length}
          </strong>
        </button>
      ))}
    </div>
  );
}

export default StatsCards;
