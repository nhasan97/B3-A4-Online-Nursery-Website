import logo from "../../assets/icons/logo.png";

const MainLogo = ({ caller }: { caller: string }) => {
  return (
    <a
      href="/"
      className={`w-fit flex ${
        caller === "d" ? "justify-center" : "justify-start hidden md:flex"
      } items-center text-xl text-[#757575]`}
    >
      <img src={logo} alt="" className="w-[20%]" />
      <span> | Blooms & Beyond</span>
    </a>
  );
};

export default MainLogo;
