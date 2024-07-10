import { TChildren } from "@/types/children.type";

const DashboardContainer = ({ children }: TChildren) => {
  return (
    <div className="w-full h-full bg-[#98b2992f] flex flex-col justify-center items-center p-5 md:p-10 2xl:p-20">
      {children}
    </div>
  );
};

export default DashboardContainer;
