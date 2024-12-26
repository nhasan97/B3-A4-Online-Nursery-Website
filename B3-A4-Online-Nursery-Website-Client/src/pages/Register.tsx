/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/utils/imageUploader";
import authApi from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { setUser } from "@/redux/features/auth/authSlice";
import { TUser } from "@/types/auth.type";
import Container from "@/components/layouts/rootLayout/Container";
import { Button } from "@/components/ui/button";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [showPass, setShowPass] = useState(false);

  const [signUp] = authApi.useSignUpMutation();
  const [login] = authApi.useLoginMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  //========================= Register Using Email and Password =========================
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Signing Up");
    try {
      let imageUrl = "";
      //defining imageUrl base on user's image selection
      if (data.photo[0]) {
        imageUrl = await uploadImage(data.photo[0]); //posting image to IMGBB if user selects any image
      } else {
        imageUrl = import.meta.env.VITE_USER_IMAGE; // assigning a default image if user doesn't select any image
      }

      //structuring user info object for registration
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: "user",
        address: data.address,
        imageUrl,
      };

      //passing userInfo to signup function for registration
      const res = await signUp(userInfo).unwrap();

      //logging the user in if registration is successful
      if (res.data.email) {
        toast.success(res.message, { id: toastId, duration: 2000 });
        const res2 = await login({
          email: userInfo.email,
          password: userInfo.password,
        }).unwrap();
        const user = verifyToken(res2.token) as TUser;
        dispatch(setUser({ user: user, token: res2.token }));
        toast.success(res2.message, { id: toastId, duration: 2000 });

        //resetting the form
        reset();

        //navigating the user to home page after successful completion of signup and login
        if (user?.email) {
          navigate(location?.state ? location.state : "/");
        }
      }
    } catch (err: any) {
      toast.error("Somthing went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <div className="h-screen flex justify-center items-center bg-[#98b29950] bg-[url(../public/palm2.png)] bg-no-repeat bg-right-top bg-auto">
      <Container>
        {/* pc view */}

        <div className="bg-[#ffffff] hidden lg:flex rounded-lg backdrop-blur-sm shadow-xl">
          <div className="flex flex-col justify-between pt-5 sm:pt-10">
            <p className="mb-4 text-[#5D7E5F] text-3xl text-center font-bold">
              Welcome<br></br> Let&lsquo;s Go Green with Plants!
            </p>

            <div>
              <img
                src="https://i.ibb.co.com/NNc4v6z/istockphoto-1372896722-612x612.jpg"
                alt=""
                className="w-full mx-auto"
              />
            </div>
          </div>
          <div className="w-full p-5 sm:p-10 space-y-6">
            <div>
              <Button
                className="bg-transparent hover:bg-transparent text-lg text-[#5D7E5F] p-0"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <i className="fa-solid fa-arrow-left" />
              </Button>
            </div>

            <div>
              <h3 className="my-2 text-2xl md:text-3xl lg:text-4xl font-bold">
                Register
              </h3>
              <p className="mb-4 text-lg">
                Growing Green, Delivered to Your Doorstep!
              </p>
            </div>

            <form
              className="w-full flex flex-col gap-6 text-left"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full flex flex-col gap-6">
                  <Input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Name"
                    required
                    className="input w-full"
                    // defaultValue="Programming Hero8"
                  />

                  <Input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Email"
                    required
                    className="input w-full"
                    // defaultValue="web@programming-hero8.com"
                  />

                  <div className="relative">
                    <Input
                      type={showPass ? "text" : "password"}
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern:
                          /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                      })}
                      placeholder="Password"
                      required
                      className="input w-full capitalize"
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

                    {errors.password?.type === "minLength" && (
                      <p className="text-red-800">
                        Password has to be at least 6 characters long
                      </p>
                    )}
                    {errors.password?.type === "pattern" && (
                      <p className="text-red-800">
                        Password must have at least 1 uppercase letter, 1
                        lowercase letter, 1 digit & 1 special character
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full flex flex-col gap-6">
                  <div>
                    <Input
                      type="number"
                      {...register("phone", {
                        required: true,
                        minLength: 11,
                        maxLength: 11,
                      })}
                      placeholder="Cell"
                      required
                      className="input w-full"
                      // defaultValue="01322901105"
                    />
                    {errors.phone?.type === "minLength" && (
                      <p className="text-red-800">
                        Cell has to be 11 characters long
                      </p>
                    )}
                    {errors.phone?.type === "maxLength" && (
                      <p className="text-red-800">
                        Cell has to be 11 characters long
                      </p>
                    )}
                  </div>
                  <Input
                    type="text"
                    {...register("address", { required: true })}
                    placeholder="Address"
                    required
                    className="input w-full"
                    //defaultValue="Level-4, 34, Awal Centre, Banani, Dhaka"
                  />

                  <div className="flex w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">DP</Label>
                    <Input
                      type="file"
                      id="picture"
                      {...register("photo")}
                      className="input w-full"
                    />
                  </div>
                </div>
              </div>

              <Input
                type="submit"
                value="Sign Up"
                className="btn w-1/2 mx-auto flex-1 bg-[#5D7E5F] text-white text-lg"
              />
            </form>

            <div className="flex flex-col justify-center items-center mt-5 space-y-5">
              <p className="text-base font-medium">
                Already registered? Go to
                <Link className="ml-1 text-[#5D7E5F]" to="/login">
                  log in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* tab mobile view */}
        <div className="block lg:hidden w-full bg-[#ffffff] p-5 sm:p-10 space-y-6 rounded-lg backdrop-blur-sm">
          <div>
            <Button
              className="bg-transparent hover:bg-transparent text-lg text-[#5D7E5F] p-0"
              onClick={() => {
                navigate(-1);
              }}
            >
              <i className="fa-solid fa-arrow-left" />
            </Button>
          </div>

          <div>
            <h3 className="my-2 text-2xl md:text-3xl lg:text-4xl font-bold">
              Register
            </h3>
            <p className="mb-4 text-lg">
              Growing Green, Delivered to Your Doorstep!
            </p>
          </div>

          <form
            className="w-full flex flex-col gap-6 text-left"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full flex flex-col gap-6">
                <Input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  required
                  className="input w-full"
                  // defaultValue="Programming Hero8"
                />

                <Input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  required
                  className="input w-full"
                  // defaultValue="web@programming-hero8.com"
                />

                <div className="relative">
                  <Input
                    type={showPass ? "text" : "password"}
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    })}
                    placeholder="Password"
                    required
                    className="input w-full capitalize"
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

                  {errors.password?.type === "minLength" && (
                    <p className="text-red-800">
                      Password has to be at least 6 characters long
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-800">
                      Password must have at least 1 uppercase letter, 1
                      lowercase letter, 1 digit & 1 special character
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col gap-6">
                <div>
                  <Input
                    type="number"
                    {...register("phone", {
                      required: true,
                      minLength: 11,
                      maxLength: 11,
                    })}
                    placeholder="Cell"
                    required
                    className="input w-full"
                    // defaultValue="01322901105"
                  />
                  {errors.phone?.type === "minLength" && (
                    <p className="text-red-800">
                      Cell has to be 11 characters long
                    </p>
                  )}
                  {errors.phone?.type === "maxLength" && (
                    <p className="text-red-800">
                      Cell has to be 11 characters long
                    </p>
                  )}
                </div>
                <Input
                  type="text"
                  {...register("address", { required: true })}
                  placeholder="Address"
                  required
                  className="input w-full"
                  //defaultValue="Level-4, 34, Awal Centre, Banani, Dhaka"
                />

                <div className="flex w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">DP</Label>
                  <Input
                    type="file"
                    id="picture"
                    {...register("photo")}
                    className="input w-full"
                  />
                </div>
              </div>
            </div>

            <Input
              type="submit"
              value="Sign Up"
              className="btn w-1/2 mx-auto flex-1 bg-[#5D7E5F] text-white"
            />
          </form>

          <div className="flex flex-col justify-center items-center mt-5 space-y-5">
            <p className="text-base font-medium">
              Already registered? Go to
              <Link className="ml-1 text-[#5D7E5F]" to="/login">
                log in
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
