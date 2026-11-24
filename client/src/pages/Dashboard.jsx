
import React from "react";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import JobTable from "../components/JobTable";
import JobForm from "../components/JobForm";

function Dashboard({
  session,
  jobs,
  statuses,
  filter,
  setFilter,
  search,
  setSearch,
  form,
  setForm,
  onNew,
  onEdit,
  onDelete,
  onSave,
  onLogout,
  busy,
  error,
}) {
  const visibleJobs = jobs.filter(
    (job) =>
      (filter === "All" || job.status === filter) &&
      `${job.company} ${job.role}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  return (
    <>
      <Navbar
        name={session.name}
        onLogout={onLogout}
      />

      <main className="workspace">
        <small>YOUR CAREER / OVERVIEW</small>

        <div className="top">
          <div>
            <h1>Application dashboard</h1>
            <p>Every opportunity, organized in one place.</p>
          </div>

          <button onClick={onNew}>
            + New application
          </button>
        </div>

        <StatsCards
          jobs={jobs}
          statuses={statuses}
          filter={filter}
          setFilter={setFilter}
        />

        <section className="panel">
          <div className="top">
            <h2>Applications</h2>

            <input
              aria-label="Search applications"
              placeholder="Search company or role"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              aria-label="Filter status"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {["All", ...statuses].map((status) => (
                <option key={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p role="alert" className="error">
              {error}
            </p>
          )}

          <JobTable
            jobs={visibleJobs}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </section>
      </main>

      <JobForm
        form={form}
        setForm={setForm}
        statuses={statuses}
        onSave={onSave}
        onClose={() => setForm(null)}
        busy={busy}
        error={error}
      />
    </>
  );
}

export default Dashboard;
