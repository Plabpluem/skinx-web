import type { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()

  const onLogoutHandler = () => {
    localStorage.removeItem('admin')
    navigate('/')
  }
  return (
    <div className="relative">
      <div className="fixed bg-gray-100 w-screen h-[60px] flex justify-end items-center px-13 shadow-sm">
        <button onClick={onLogoutHandler} className="hover:bg-blue-500 font-semibold hover:text-white transition-all duration-500 px-4 py-2 rounded-lg cursor-pointer">Logout</button>
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
