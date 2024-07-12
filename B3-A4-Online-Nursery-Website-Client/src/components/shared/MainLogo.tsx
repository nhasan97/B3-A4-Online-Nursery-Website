import logo from "../../assets/icons/logo.png";

const MainLogo = ({ caller }: { caller: string }) => {
  return (
    <a
      href="/"
      className={`w-fit flex ${
        caller === "d" ? "justify-center" : "justify-start"
      } items-center text-xl text-[#757575] font`}
    >
      <img src={logo} alt="" className="w-[30%] sm:w-[15%] mr-1" />
      <span
        className={caller === "d" || caller === "f" ? "flex" : `hidden sm:flex`}
      >
        | Blooms & Beyond
      </span>
    </a>
  );
};

export default MainLogo;
