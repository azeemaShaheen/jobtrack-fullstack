
import React from "react";

function Login({
  isRegistering,
  setIsRegistering,
  onLogin,
  busy,
  error,
  setError,
}) {
  return (
    <main className="login">
      <section className="intro">
        <div className="brand">◈ JobTrack</div>

        <h1>Your next chapter starts here.</h1>

        <p>
          Organize your applications, prepare for interviews
          and keep your career moving.
        </p>
      </section>

      <form className="auth" onSubmit={onLogin}>
        <small>CAREER WORKSPACE</small>

        <h2>
          {isRegistering ? "Create your account" : "Welcome back"}
        </h2>

        {isRegistering && (
          <label>
            Name
            <input name="name" required />
          </label>
        )}

        <label>
          Email
          <input name="email" type="email" required />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            minLength={8}
            required
          />
        </label>

        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}

        <button disabled={busy}>
          {busy
            ? "Please wait…"
            : isRegistering
              ? "Create account"
              : "Sign in"}
        </button>

        <button
          type="button"
          className="ghost"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError("");
          }}
        >
          {isRegistering
            ? "Already registered? Sign in"
            : "New here? Create an account"}
        </button>
      </form>
    </main>
  );
}

export default Login;
