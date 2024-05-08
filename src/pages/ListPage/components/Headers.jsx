import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import arrowRight from "../assets/arrow-right.png";

function Header() {
  return (
    <div className="flex justify-between items-center h-[57px] pt-[40px] px-[130px]">
      <Link to="/">
        <img className="w-[146px] h-[57px]" src={logo} alt="오픈마인드 로고" />
      </Link>
      <button
        className="flex justify-center items-center w-[161px] h-[46px] gap-[8px] rounded-lg border-[1px]
      bg-[#F5F1EE] border-[#542F1A] text-[#542F1A] text-[16px] font-normal text-left"
      >
        답변하러 가기
        <img className="w-[18px] h-[18px]" src={arrowRight} alt=">" />
      </button>
    </div>
  );
}

export default Header;