import logo from "../../assets/icons/logo.png";

const MainLogo = ({ caller }: { caller: string }) => {
  return (
    <a
      href="/"
      className={`w-fit flex ${
        caller === "d" ? "justify-center" : "justify-start"
      } items-center text-xl text-[#757575]`}
    >
      <img src={logo} alt="" className="w-[30%] sm:w-[20%]" />
      <span className="hidden sm:flex"> | Blooms & Beyond</span>
    </a>
  );
};

export default MainLogo;
