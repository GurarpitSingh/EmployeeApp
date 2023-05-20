import { useEffect, useRef, useState } from "react";
import "./App.css";

// import Dashboard from './components/Dashboard'

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  NavLink,
} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<Dashboard />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
