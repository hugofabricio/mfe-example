import * as React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <div id="sidebar">
        <h1>Module Federation</h1>
        <nav>
          <ul>
            <li>
              <NavLink to={`/`}>Home</NavLink>
            </li>
            <li>
              <NavLink to={`contato`}>Contato</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div id="content">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
