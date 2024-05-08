import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
  return (
    <div className="flex justify-between items-center h-[57px] pt-[40px] px-[130px]">
      <Link to="/">
        <img className="w-[146px] h-[57px]" src={logo} alt="오픈마인드 로고" />
      </Link>
    </div>
  );
}

export default Header;
