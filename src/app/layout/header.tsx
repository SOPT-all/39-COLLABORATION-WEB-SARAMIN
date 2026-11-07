import { Link } from 'react-router';

import { ROUTES } from '@/shared/constants/routes';

const Header = () => {
  return (
    <header>
      <Link to={ROUTES.HOME}>사람인</Link>
    </header>
  );
};

export default Header;
