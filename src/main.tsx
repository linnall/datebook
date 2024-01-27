import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/navbar.tsx";
import Create from "./routes/create.tsx";
import Login from "./routes/login.tsx";
import Timeline from "./routes/timeline.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { KintoneRestAPIClient } from "@kintone/rest-api-client";

export const client = new KintoneRestAPIClient({
  baseUrl: "https://uofthacks.qhyun.org/proxy",
  auth: { apiToken: "In6YFm0X5ek3iwrQj8I0iwXiHnTnkQwRwMDVGHnP" },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "timeline",
        element: <Timeline />,
      },
      {
        path: "create",
        element: <Create />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain="dev-nddjtjvojvrqbgat.us.auth0.com"
    clientId="mi8q01NBQMLKrcBnAj104HK3q1qnMDDB"
    authorizationParams={{
      redirect_uri: "http://localhost:5173/timeline",
    }}
  >
    <React.StrictMode>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </React.StrictMode>
  </Auth0Provider>
);
