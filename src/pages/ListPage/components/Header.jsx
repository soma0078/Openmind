import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import arrowRight from "../assets/arrow-right.png";

function Header() {
  // const name = localStorage.getItem("5741");
  // console.log("--- name ---");
  // console.log(name);

  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  console.log("--- userData ---");
  console.log(userData);

  const navigate = useNavigate();

  // "답변하러 가기" 버튼 클릭 시,
  // 질문 받기로 생성한 id가 로컬 스토리지에 없으면 "/" 페이지로 이동
  // id가 로컬 스토리지에 있으면 "/post/{id}/answer" 페이지로 이동
  const handleGoToAnswer = () => {
    const id = localStorage.getItem("id");
    if (id) {
      navigate(`/post/${id}/answer`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-between items-center h-[57px] pt-[40px] px-[130px]">
      <Link to="/">
        <img className="w-[146px] h-[57px]" src={logo} alt="오픈마인드 로고" />
      </Link>
      <button
        onClick={handleGoToAnswer}
        className="flex justify-center items-center w-[161px] h-[46px] rounded-lg border-[1px]
      bg-[#F5F1EE] border-[#542F1A] text-[#542F1A] text-[16px] font-normal text-left"
      >
        답변하러 가기 →
      </button>
    </div>
  );
}

export default Header;
