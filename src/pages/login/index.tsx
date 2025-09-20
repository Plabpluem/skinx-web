import { Field, Form, Formik } from "formik";
import { useRef, useState } from "react";
import { useGlobalNonTokenMutation } from "../../services/useGlobalMutation";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../../helper/showNotification";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [initialValue, setInitialValue] = useState<any>({
    username: "",
    password: "",
  });
  const formikRef = useRef<any>(null)

  const { mutateAsync: postLogin, isPending: loadingLogin } =
    useGlobalNonTokenMutation("/users/sign-in", {
      onSuccess: (res: any) => {
        if (res.statusCode == 200) {
          const payload = res.data;
          localStorage.setItem("admin", JSON.stringify(payload));
          navigate("/post");
        }
      },
      onError: (err: any) => {
        showNotification(err.response.data.message, "error");
      },
    });

  const { mutateAsync: postSignUp, isPending: loadingSignup } =
    useGlobalNonTokenMutation("/users/sign-up", {
      onSuccess: (res: any) => {
        if (res.statusCode == 200) {
          showNotification("สร้างแอคเค้าสำเร็จ", "success");
          formikRef.current?.resetForm();
          setIsLogin(true);
        }
      },
      onError: (err: any) => {
        showNotification(err.response.data.message, "error");
      },
    });

  const onSubmitHandler = async (value: any) => {
    if (isLogin) {
      postLogin({ data: value });
    } else {
      postSignUp({ data: value });
    }
  };
  
  return (
    <>
      <div className="bg-blue-950 h-screen w-screen flex justify-center items-center">
        <div className="w-[40%] h-[40%] bg-white rounded-xl flex flex-col justify-center gap-8 p-8">
          <h1 className="text-2xl font-bold">
            {isLogin ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
          </h1>
          <Formik innerRef={formikRef} onSubmit={onSubmitHandler} initialValues={initialValue} enableReinitialize>
            {(props) => (
              <Form className="flex flex-col gap-1">
                <div className="flex flex-col gap-1 items-start">
                  <label htmlFor="username" className="text-lg font-semibold">
                    ชื่อผู้ใช้
                  </label>
                  <Field
                    id="username"
                    name="username"
                    placeholder="กรุณาป้อน username"
                    className="border rounded-lg border-gray-300 py-2 flex-1 w-full px-4"
                  />
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <label htmlFor="password" className="text-lg font-semibold">
                    รหัสผ่าน
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="กรุณาป้อน password"
                    className="border rounded-lg border-gray-300 py-2 flex-1 w-full px-4"
                  />
                </div>
                <p
                  onClick={() => setIsLogin((prev) => !prev)}
                  className="cursor-pointer font-semibold text-right text-blue-500"
                >
                  {isLogin ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
                </p>
                <button
                  type="submit"
                  className="py-2 mt-5 bg-white-500! hover:border-blue-500! border border-blue-300! rounded-xl outline-none text-blue-500 font-semibold! shadow! transition cursor-pointer"
                >
                  {isLogin ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginSignup;
