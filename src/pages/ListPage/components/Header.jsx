import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
  return (
    <div className="pt-[50px] flex justify-center tablet-1:justify-start tablet-1:pl-[50px]">
      <Link to="/">
        <img className="w-[146px] h-[57px]" src={logo} alt="오픈마인드 로고" />
      </Link>
    </div>
  );
}

export default Header;
