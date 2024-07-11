import titleLogo from "../../assets/icons/leaf2.png";

const Title = ({ title }: { title: string }) => {
  return (
    <div className="w-full flex justify-center mt-10 mb-2 md:mb-0">
      <img src={titleLogo} alt="" className="w-5" />
      <h1 className="text-center text-[#757575] text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold">
        {title}
      </h1>
    </div>
  );
};

export default Title;
