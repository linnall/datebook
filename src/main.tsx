import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/navbar.tsx";
import App from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        path: "",
        element: <App />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
