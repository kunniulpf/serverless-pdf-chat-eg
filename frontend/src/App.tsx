import { Amplify, Auth } from "aws-amplify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./routes/layout";
import LoginLayout from "./routes/loginLayout";
import Documents from "./routes/documents";
import Chat from "./routes/chat";
import Home from "./routes/home";

Amplify.configure({
  Auth: {
    userPoolId: import.meta.env.VITE_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
    region: import.meta.env.VITE_API_REGION,
  },
  API: {
    endpoints: [
      {
        name: "serverless-pdf-chat",
        endpoint: import.meta.env.VITE_API_ENDPOINT,
        region: import.meta.env.VITE_API_REGION,
        custom_header: async () => {
          return {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`,
          };
        },
      },
    ],
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        Component: Home,
      }
    ],
  },
  {
    path: "/doc",
    element: <LoginLayout />,
    children: [
      {
        index: true,
        Component: Documents,
      },
      {
        path: "/doc/list",
        Component: Documents,
      },
      {
        path: "/doc/:documentid/:conversationid",
        Component: Chat,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
