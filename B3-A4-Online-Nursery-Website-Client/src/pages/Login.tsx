/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import authApi from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { toast } from "sonner";
import Container from "@/components/layouts/rootLayout/Container";
import { TUser } from "@/types/auth.type";
import { Button } from "@/components/ui/button";

const Login = () => {
  const { register, handleSubmit, setValue, reset } = useForm();

  const dispatch = useAppDispatch();

  const [login] = authApi.useLoginMutation();

  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // //==================== Login Using Email and Password ====================

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging In");
    try {
      const res = await login(data).unwrap();

      const user = verifyToken(res.token) as TUser;

      dispatch(setUser({ user: user, token: res.token }));

      toast.success(res.message, { id: toastId, duration: 2000 });

      reset();

      if (user?.email) {
        navigate(location?.state ? location.state : "/");
      }
    } catch (err: any) {
      toast.error("Somthing went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[url('/public/loginRegBG.png')] bg-[rgba(20,20,20,0.73)] bg-no-repeat bg-center bg-cover bg-blend-overlay bg-fixed">
      <Container>
        <div className="w-full bg-[#f4f3f081] p-5 sm:p-10 space-y-6 rounded-lg backdrop-blur-sm">
          <div>
            <Button
              className="bg-transparent hover:bg-transparent text-lg hover:text-[#5D7E5F] p-0"
              onClick={() => {
                navigate(-1);
              }}
            >
              <i className="fa-solid fa-arrow-left" />
            </Button>
          </div>

          <div>
            <h3 className="my-2 text-2xl md:text-3xl lg:text-4xl font-bold">
              Login
            </h3>
            <p className="mb-4 text-lg">
              Welcome Back! Let&lsquo;s Get Started
            </p>
          </div>

          <div className="border-2 border-default-200 rounded-xl p-3 space-y-3">
            <h2 className="text-xs text-red-600">*Only for testing purpose*</h2>
            <h3 className="text-sm">
              Select a role and credentials will be generated automatically
            </h3>
            <div className="flex gap-2 items-center">
              <Button
                className="w-1/2"
                onClick={() => {
                  setValue("email", "admin@gmail.com");
                  setValue("password", "123456Aa@");
                }}
              >
                Admin
              </Button>
              <Button
                className="w-1/2"
                onClick={() => {
                  setValue("email", "n@yahoo.com");
                  setValue("password", "123456Aa@");
                }}
              >
                Customer
              </Button>
            </div>
          </div>

          <form
            className="w-full flex flex-col gap-5 text-left"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="email"
              id="in2"
              {...register("email")}
              placeholder="Email"
              required
              className="w-full rounded-lg"
              // defaultValue="n@yahoo.com"
            />

            <div className="relative">
              <Input
                type={showPass ? "text" : "password"}
                id="in3"
                {...register("password")}
                placeholder="Password"
                required
                className="w-full rounded-lg"
                // defaultValue="123456Aa@"
              />
              <span
                className="h-full absolute right-2 top-0 flex justify-center items-center"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </span>
            </div>

            {/* {loginError && (
                <p className="text-red-500 text-center font-bold">
                  {loginError}
                </p>
              )} */}

            <Input
              type="submit"
              value="Sign In"
              className="btn w-1/2 mx-auto flex-1 bg-red-700 text-white"
            />
          </form>

          <div className="flex flex-col justify-center items-center mt-5 space-y-5">
            <p className="text-base font-medium">
              Dont have an account?
              <Link className="ml-3 text-red-700" to="/register">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
