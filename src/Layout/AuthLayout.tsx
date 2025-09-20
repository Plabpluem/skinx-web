import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const AuthLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const checkAuth = () => {
    const stored = localStorage.getItem("admin");
    const token = stored ? JSON.parse(stored).token : "";

    if (!token) {
      navigate("/");
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return <Layout>{children}</Layout>;
};

export default AuthLayout;
