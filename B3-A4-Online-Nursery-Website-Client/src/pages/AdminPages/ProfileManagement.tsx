import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import EditProfileModal from "@/components/modules/AdminCustomerCommonComponents/ProfileManagement/EditProfileModal";
import Loading from "@/components/shared/Loading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import profileApi from "@/redux/api/profile.Api";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types/auth.type";
import { verifyToken } from "@/utils/verifyToken";
import { Helmet } from "react-helmet-async";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const ProfileManagement = () => {
  const { token } = useAppSelector((currentState) => currentState.auth);

  let user;
  if (token) {
    user = verifyToken(token);
  }

  const { isLoading: loadingUser, data: loadedUser } =
    profileApi.useGetLoggedInUserQuery((user as TUser)?.id);

  return (
    <div className="h-[calc(100vh-64px)]">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Profile</title>
        </Helmet>

        <div className="w-full h-full flex flex-col justify-between gap-6">
          <div className="w-full">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin-dashboard/admin-overview">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Profile</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="bg-white w-full h-full overflow-y-auto rounded-lg">
            {loadingUser ? (
              <Loading />
            ) : (
              <div className="w-full h-full">
                <div
                  style={{
                    backgroundImage: `url(${loadedUser?.data?.imageUrl}), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    objectFit: "cover",
                    objectPosition: "center",
                    backgroundBlendMode: "overlay",
                  }}
                  className="w-full"
                >
                  <img
                    src={loadedUser?.data?.imageUrl}
                    alt=""
                    className="size-48 object-cover object-center rounded-full border-2 border-white mx-auto translate-y-[50%]"
                  />
                </div>

                <div className="text-center mt-20 space-y-6 p-5">
                  <div>
                    <p className="text-3xl font-semibold">
                      {loadedUser?.data?.name}
                    </p>
                  </div>

                  <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="w-full flex flex-row xl:flex-col justify-start items-center gap-3 bg-[#b0c3b148]  p-5 rounded-lg shadow-lg">
                      <MdEmail className="text-[#5D7E5F] text-xl md:text-5xl" />
                      <p className="font-medium">{loadedUser?.data?.email}</p>
                    </div>
                    <div className="w-full flex flex-row xl:flex-col justify-start items-center gap-3 bg-[#b0c3b148]  p-5 rounded-lg shadow-lg">
                      <FaPhoneAlt className="text-[#5D7E5F] text-xl md:text-5xl" />
                      <p className="font-medium">{loadedUser?.data?.phone}</p>
                    </div>
                    <div className="w-full flex flex-row xl:flex-col justify-start items-center gap-3 bg-[#b0c3b148]  p-5 rounded-lg shadow-lg">
                      <IoLocationSharp className="text-[#5D7E5F] text-xl md:text-5xl" />
                      <p className="font-medium">{loadedUser?.data?.address}</p>
                    </div>
                  </div>

                  <EditProfileModal user={loadedUser?.data} />
                </div>
              </div>
            )}
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default ProfileManagement;
