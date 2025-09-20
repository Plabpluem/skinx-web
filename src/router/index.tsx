import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { lazy } from "react";
import AuthLayout from "../Layout/AuthLayout";
const LoginSignup = lazy(() => import("../pages/login/index"));

const PostList = lazy(() => import("../pages/posts/List"));
const PostDetail = lazy(() => import("../pages/posts/Detail"));

const router = createBrowserRouter([
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/",
    element: <LoginSignup />,
  },
  {
    path: "/post",
    element: (
      <AuthLayout>
        <PostList />
      </AuthLayout>
    ),
  },
  {
    path: "/post/:id",
    element: (
      <AuthLayout>
        <PostDetail />
      </AuthLayout>
    ),
  },
]);

export default router;
