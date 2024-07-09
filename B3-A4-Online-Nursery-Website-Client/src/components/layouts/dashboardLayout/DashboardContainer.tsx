import { TChildren } from "@/types/children.type";

const DashboardContainer = ({ children }: TChildren) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-5 md:p-10 border">
      {children}
    </div>
  );
};

export default DashboardContainer;
