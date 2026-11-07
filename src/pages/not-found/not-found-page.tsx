import { Link } from 'react-router';

import { ROUTES } from '@/shared/constants/routes';

const NotFoundPage = () => {
  return (
    <section>
      <h1>페이지를 찾을 수 없어요</h1>
      <Link to={ROUTES.HOME}>홈으로 돌아가기</Link>
    </section>
  );
};

export default NotFoundPage;
