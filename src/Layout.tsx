// Layout.tsx
import React from "react";
import Button from "./components/Button/Button";
import { Link, useLocation } from "react-router-dom";

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const isActive = (pathname: string) => {
    return location.pathname === pathname;
  };

  return (
    <>
      <header>
        <h3 style={{ marginTop: 0 }}>React Playground</h3>
        <nav>
          <ul>
            <li>
              <Button isActive={isActive("/")}>
                <Link to="/">Main</Link>
              </Button>
            </li>
            <li>
              <Button isActive={isActive("/counter")}>
                <Link to="/counter">Counter</Link>
              </Button>
            </li>
            <li>
              <Button isActive={isActive("/devices")}>
                <Link to="/devices">Devices</Link>
              </Button>
            </li>
            <li>
              <Button isActive={isActive("/list")}>
                <Link to="/list">List</Link>
              </Button>
            </li>
            <li>
              <Button isActive={isActive("/infinite-scroll")}>
                <Link to="/infinite-scroll">Infinite Scroll</Link>
              </Button>
            </li>
            <li>
              <Button isActive={isActive("/tic-tac-toe")}>
                <Link to="/tic-tac-toe">Tic Tac Toe</Link>
              </Button>
            </li>
            <li>
              <Button isActive={isActive("/pagination")}>
                <Link to="/pagination">Pagination</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}

export default Layout;
