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
    <div className="w-full h-screen flex justify-center items-center bg-[#98b29950] bg-[url(../public/palm2.png)] bg-no-repeat bg-right-top bg-auto">
      <Container>
        <div className="bg-[#ffffff] flex rounded-lg backdrop-blur-sm shadow-xl">
          <div className="flex flex-col w-full p-5 sm:p-10 space-y-1 lg:space-y-6">
            <div>
              <Button
                className="bg-transparent hover:bg-transparent text-lg text-[#5D7E5F] p-0"
                onClick={() => {
                  navigate("/");
                }}
              >
                <i className="fa-solid fa-arrow-left mr-1" /> Back to Home
              </Button>
            </div>

            <div>
              <h3 className="my-2 text-2xl md:text-3xl lg:text-4xl font-bold">
                Login
              </h3>
              <p className=" lg:hidden mb-4 text-lg">
                Welcome Back! Let&lsquo;s Get Started
              </p>
            </div>

            <div className="border-2 border-default-200 rounded-xl p-3 space-y-3">
              <h2 className="text-xs text-red-600">
                *Only for testing purpose*
              </h2>
              <h3 className="text-sm">
                Select a role and credentials will be generated automatically
              </h3>
              <div className="flex gap-2 items-center">
                <Button
                  className="w-1/2 bg-[#5D7E5F] rounded-full lg:text-lg"
                  onClick={() => {
                    setValue("email", "admin@gmail.com");
                    setValue("password", "123456Aa@");
                  }}
                >
                  Admin
                </Button>
                <Button
                  className="w-1/2 bg-[#5D7E5F] rounded-full lg:text-lg"
                  onClick={() => {
                    setValue("email", "a@gmail.com");
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
                className="w-full rounded-full"
                // defaultValue="n@yahoo.com"
              />

              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  id="in3"
                  {...register("password")}
                  placeholder="Password"
                  required
                  className="w-full rounded-full"
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
                className="btn w-1/2 mx-auto flex-1 bg-[#5D7E5F] lg:text-lg text-white"
              />
            </form>

            <div className="flex flex-col justify-center items-center mt-5 space-y-5">
              <p className="text-base font-medium">
                Dont have an account?
                <Link className="ml-3 text-[#5D7E5F]" to="/register">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          <div className="hidden lg:flex flex-col justify-between pt-5 sm:pt-10">
            <p className="mb-4 text-[#5D7E5F] text-3xl text-center font-bold">
              Welcome Back<br></br> Let&lsquo;s Go Green with Plants!
            </p>

            <div>
              <img
                src="https://i.ibb.co.com/KWt2dgQ/Aglaonema-Houseplants.jpg"
                alt=""
                className="w-3/4 mx-auto"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
