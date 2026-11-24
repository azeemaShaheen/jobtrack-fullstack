
import React from "react";

function JobForm({
  form,
  setForm,
  statuses,
  onSave,
  onClose,
  busy,
  error,
}) {
  if (!form) return null;

  return (
    <div className="overlay">
      <form className="modal" onSubmit={onSave}>
        <div className="top">
          <h2>
            {form._id ? "Edit" : "New"} application
          </h2>

          <button
            type="button"
            className="ghost"
            onClick={onClose}
          >
            Close ×
          </button>
        </div>

        {[
          ["company", "Company", "text"],
          ["role", "Job title", "text"],
          ["date", "Application date", "date"],
          ["interview", "Interview date and time", "datetime-local"],
        ].map(([key, label, type]) => (
          <label key={key}>
            {label}
            <input
              type={type}
              required={key !== "interview"}
              value={form[key]}
              onChange={(e) =>
                setForm({ ...form, [key]: e.target.value })
              }
            />
          </label>
        ))}

        <label>
          Status
          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>

        <label>
          Notes
          <textarea
            value={form.notes}
            onChange={(e) =>
              setForm({ ...form, notes: e.target.value })
            }
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button disabled={busy}>
          {busy ? "Saving…" : "Save application"}
        </button>
      </form>
    </div>
  );
}

export default JobForm;
