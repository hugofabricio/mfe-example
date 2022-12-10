import * as React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import loadable from "@loadable/component";
import "./app.css";

import Root from "./routes/root";
import ErrorPage from "./error";

// @ts-ignore
const Home = loadable(() => import("HomeApp/HomePage"));
// @ts-ignore
const Contact = loadable(() => import("ContactApp/ContactPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "contato",
        element: <Contact />,
      },
    ],
  },
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("__app")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
