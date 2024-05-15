import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
  return (
    <div className="flex justify-center pt-12 tablet-1:justify-start tablet-1:pl-14">
      <Link to="/">
        <img className="w-[146px] h-[57px]" src={logo} alt="오픈마인드 로고" />
      </Link>
    </div>
  );
}

export default Header;
