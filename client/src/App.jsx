
import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { api } from "./services/api";

const statuses = ["Applied", "Interview", "Offer", "Rejected"];

const createEmptyForm = () => ({
  company: "",
  role: "",
  status: "Applied",
  date: new Date().toISOString().slice(0, 10),
  interview: "",
  notes: "",
});

function App() {
  const [session, setSession] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [busy, setBusy] = useState(false);

  // Retrieve applications from the backend
  async function loadJobs() {
    try {
      const data = await api(
        "/jobs",
        "GET",
        undefined,
        session.token,
      );

      setJobs(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (session) {
      loadJobs();
    }
  }, [session]);

  // Handle login and registration
  async function handleLogin(event) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const credentials = Object.fromEntries(
        new FormData(event.target),
      );

      const data = await api(
        isRegistering ? "/register" : "/login",
        "POST",
        credentials,
      );

      setSession(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  // Create or update an application
  async function handleSave(event) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const path = form._id
        ? `/jobs/${form._id}`
        : "/jobs";

      const method = form._id ? "PUT" : "POST";

      await api(path, method, form, session.token);

      setForm(null);
      await loadJobs();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  // Delete an application
  async function handleDelete(id) {
    if (!window.confirm("Delete this application?")) {
      return;
    }

    setError("");

    try {
      await api(
        `/jobs/${id}`,
        "DELETE",
        undefined,
        session.token,
      );

      await loadJobs();
    } catch (err) {
      setError(err.message);
    }
  }

  // Open a new application form
  function handleNew() {
    setError("");
    setForm(createEmptyForm());
  }

  // Open an existing application for editing
  function handleEdit(job) {
    setError("");
    setForm({ ...createEmptyForm(), ...job });
  }

  // Clear the current user session
  function handleLogout() {
    setSession(null);
    setJobs([]);
    setForm(null);
    setError("");
    setSearch("");
    setFilter("All");
    setIsRegistering(false);
  }

  if (!session) {
    return (
      <Login
        isRegistering={isRegistering}
        setIsRegistering={setIsRegistering}
        onLogin={handleLogin}
        busy={busy}
        error={error}
        setError={setError}
      />
    );
  }

  return (
    <Dashboard
      session={session}
      jobs={jobs}
      statuses={statuses}
      filter={filter}
      setFilter={setFilter}
      search={search}
      setSearch={setSearch}
      form={form}
      setForm={setForm}
      onNew={handleNew}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onSave={handleSave}
      onLogout={handleLogout}
      busy={busy}
      error={error}
    />
  );
}

export default App;
