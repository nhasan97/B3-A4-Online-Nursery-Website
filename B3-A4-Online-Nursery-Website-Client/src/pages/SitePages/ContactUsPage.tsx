/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/components/layouts/rootLayout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, useForm } from "react-hook-form";
import conatctGif from "../../assets/gifs/Contact.gif";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { TUser } from "@/types/auth.type";
import messageApi from "@/redux/api/messageApi";
import { displaySuccessToast } from "@/utils/displaySuccessToast";

const ContactUsPage = () => {
  const { token } = useAppSelector((currentState) => currentState.auth);

  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: (user as TUser)?.name || "",
      email: (user as TUser)?.email || "",
      subject: "",
      message: "",
    },
  });

  const [sendMessage] = messageApi.usePostMessageMutation();

  const handleSendMessage = async (data: FieldValues) => {
    const meassgeInfo = {
      ...data,
      sendersImage:
        (user as TUser)?.profilePhoto || import.meta.env.VITE_USER_IMAGE,
      sentTo: import.meta.env.VITE_ADMIN_EMAIL,
    };
    const res = await sendMessage(meassgeInfo).unwrap();
    displaySuccessToast(res);
  };

  return (
    <div className="w-full h-full py-10">
      <Container>
        <div className="w-full min-h-screen 2xl:h-[calc(100vh-64px)]">
          <div className="w-full h-[5%]">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Contact Us</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="w-full h-full flex flex-col xl:flex-row gap-6 px-2 py-2 md:px-10 md:py-5 mt-6">
            <div className="w-full xl:w-1/2 xl:h-screen 2xl:h-[95%] flex flex-col justify-center items-center gap-6 rounded-lg">
              <div className="w-full h-[50%] flex flex-col justify-center items-center rounded-lg">
                <img
                  src={conatctGif}
                  alt=""
                  className="w-full md:w-[80%] mx-auto"
                />
              </div>

              {/* //// Contact Info //// */}
              <div className="w-full h-[50%] flex flex-col justify-center items-center p-5 rounded-lg shadow-xl">
                <h1 className="w-full text-lg md:text-2xl text-left font-semibold mb-6">
                  Contact Info
                </h1>
                <div className="w-full space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="size-12 bg-[#5D7E5F] flex justify-center items-center text-white text-2xl rounded-full">
                      <i className="fa-solid fa-envelope" />
                    </div>
                    <div>
                      <h3 className="text-[#303030] font-medium">Email</h3>
                      <p className="text-sm md:text-base text-[#696969]">
                        Sample@gmail.com
                      </p>
                    </div>
                  </div>
                  {/* ---------------------------------------------------------------------------- */}

                  <div className="flex items-center gap-3">
                    <div className="size-12 bg-[#5D7E5F] flex justify-center items-center text-white text-2xl rounded-full">
                      <i className="fa-solid fa-phone" />
                    </div>
                    <div>
                      <h3 className="text-[#303030] font-medium">Cell</h3>
                      <p className="text-sm md:text-base text-[#696969]">
                        +8943465445
                      </p>
                    </div>
                  </div>
                  {/* ---------------------------------------------------------------------------- */}

                  <div className="flex items-center gap-3">
                    <div className="size-12 bg-[#5D7E5F] flex justify-center items-center text-white text-2xl rounded-full">
                      <i className="fa-solid fa-location-dot" />
                    </div>
                    <div>
                      <h3 className="text-[#303030] font-medium">
                        Office Location
                      </h3>
                      <p className="text-sm md:text-base text-[#696969] text-wrap">
                        house# 29, sarwardi avenue, baridhara diplomatic
                        enclave, 1212, Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-1/2 xl:h-screen 2xl:h-[95%] bg-[#98b29950] backdrop-blur-md flex flex-col justify-center p-5 xl:p-10 rounded-lg">
              <form
                className="bg-[#98b2998c] p-5 rounded-xl shadow-lg"
                onSubmit={handleSubmit(handleSendMessage)}
              >
                <h1 className="text-white text-lg md:text-2xl font-semibold mb-6">
                  Get in touch
                </h1>

                <div className="space-y-6">
                  <Input
                    type="text"
                    {...register("name")}
                    placeholder="Name"
                    required
                    className="w-full rounded-full"
                  />

                  <Input
                    type="email"
                    {...register("email")}
                    placeholder="Email"
                    required
                    className="w-full rounded-full"
                  />

                  <Input
                    type="text"
                    {...register("subject")}
                    placeholder="Subject"
                    required
                    className="w-full rounded-full"
                  />

                  <Textarea
                    {...register("message")}
                    placeholder="Message"
                    required
                    className="w-full rounded-full"
                  />

                  <Button
                    type="submit"
                    className="w-full bg-[#5D7E5F] text-lg rounded-full"
                  >
                    Send <i className="fa-solid fa-paper-plane ml-2" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactUsPage;
