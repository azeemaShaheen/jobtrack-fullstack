import React from "react";

function Navbar({ name, onLogout }) {
  return (
    <header>
      <div className="brand">◈ JobTrack</div>

      <div>
        {name}{" "}
        <button className="ghost" onClick={onLogout}>
          Sign out
        </button>
      </div>
    </header>
  );
}

export default Navbar;
