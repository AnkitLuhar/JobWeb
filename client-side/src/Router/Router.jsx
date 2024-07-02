import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import PostJob from "../Pages/PostJob";
import MyJobs from "../Pages/MyJobs";
import SalaryEstimation from "../Pages/SalaryEstimation";
import UpdateJob from "../Pages/UpdateJob";
import Login from "../components/Login";

// import About from "../Pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post-job",
        element: <PostJob />,
      },
      {
        path: "/my-job",
        element: <MyJobs />,
      },
      {
        path: "/salary",
        element: <SalaryEstimation />,
      },
      {
        path: "/edit-job/:id",
        element: <UpdateJob />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
