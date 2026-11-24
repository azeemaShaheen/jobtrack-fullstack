
import React from "react";

function JobTable({ jobs, onEdit, onDelete }) {
  return (
    <div className="tablewrap">
      <table>
        <thead>
          <tr>
            <th>Company / Role</th>
            <th>Status</th>
            <th>Applied</th>
            <th>Interview</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>
                <b>{job.company}</b>
                <br />
                <span>{job.role}</span>
              </td>

              <td>
                <span className={"tag " + job.status}>
                  {job.status}
                </span>
              </td>

              <td>{job.date}</td>

              <td>
                {job.interview
                  ? job.interview.replace("T", " ")
                  : "—"}
              </td>

              <td>
                <button
                  className="ghost"
                  onClick={() => onEdit(job)}
                >
                  Edit
                </button>

                <button
                  className="ghost danger"
                  onClick={() => onDelete(job._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!jobs.length && (
        <p className="empty">
          No applications here yet. Add an opportunity to get started.
        </p>
      )}
    </div>
  );
}

export default JobTable;
