import { TChildren } from "@/types/children.type";

const Container = ({ children }: TChildren) => {
  return (
    <div className="max-w-screen-2xl mx-auto px-5 md:px-8 lg:px-10 xl:px-20">
      {children}
    </div>
  );
};

export default Container;
