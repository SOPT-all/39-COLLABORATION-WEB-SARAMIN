import { useNavigate } from 'react-router';

import StateMessage from '@/shared/components/state-message/state-message';
import { ROUTES } from '@/shared/constants/routes';

// 없는 주소로 들어왔을 때 보여 주는 화면이에요. 홈으로 돌아가는 버튼만 둬요.
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex w-315 flex-col items-center gap-6 py-30">
      <h1 className="text-heading-24 text-text-primary">
        페이지를 찾을 수 없어요
      </h1>
      <StateMessage
        kind="empty"
        scope="section"
        title="주소가 바뀌었거나 없는 페이지예요"
        description="입력한 주소를 다시 확인하거나 홈에서 공고를 찾아보세요."
        action={{
          label: '홈으로 돌아가기',
          onClick: () => navigate(ROUTES.HOME),
        }}
      />
    </div>
  );
};

export default NotFoundPage;
