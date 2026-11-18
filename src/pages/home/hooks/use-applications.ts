import { useQuery } from '@tanstack/react-query';

import { MOCK_APPLICATIONS } from '@/pages/home/constants/mock-applications';
import type { Application } from '@/pages/home/types/application';
import { QUERY_KEYS } from '@/shared/constants/query-keys';

const MOCK_DELAY_MS = 500;

// 지원 내역 API는 서버 범위 밖이라 목 데이터를 돌려줘요.
// 로딩 화면을 보여줄 수 있게 일부러 조금 늦게 응답해요.
const getApplications = () =>
  new Promise<Application[]>((resolve) => {
    setTimeout(() => resolve(MOCK_APPLICATIONS), MOCK_DELAY_MS);
  });

interface UseApplicationsOptions {
  enabled?: boolean;
}

// 지원 내역 모달에서 쓰는 지원 내역이에요.
// 모달이 열렸을 때만 불러오도록 enabled를 받아요.
export const useApplications = ({
  enabled = true,
}: UseApplicationsOptions = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.USER.applications,
    queryFn: getApplications,
    enabled,
  });
};
