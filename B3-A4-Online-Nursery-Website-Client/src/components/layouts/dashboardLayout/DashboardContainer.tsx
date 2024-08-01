import { TChildren } from "@/types/children.type";

const DashboardContainer = ({ children }: TChildren) => {
  return (
    <div className="w-full h-full bg-[#98b2992f] bg-[url(../public/palm2.png)] bg-no-repeat bg-right-top bg-auto flex flex-col justify-center items-center p-5 md:p-10 2xl:p-20">
      {children}
    </div>
  );
};

export default DashboardContainer;
