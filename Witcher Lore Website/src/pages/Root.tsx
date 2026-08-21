import { Outlet, ScrollRestoration } from "react-router";
import Nav from "../components/Nav";

export default function Root() {
  return (
    <div style={{ minHeight: "100vh", background: "#08070a" }}>
      <ScrollRestoration />
      <Nav />
      <main style={{ paddingTop: "64px" }}>
        <Outlet />
      </main>
    </div>
  );
}
