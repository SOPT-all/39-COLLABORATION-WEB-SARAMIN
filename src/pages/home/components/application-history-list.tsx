import { useEffect, useRef } from 'react';

import ApplicationHistorySectionHeader from '@/pages/home/components/application-history-section-header';
import { APPLICATION_STATUSES } from '@/pages/home/constants/application-statuses';
import type { Application } from '@/pages/home/types/application';
import RowApplicationHistory from '@/shared/components/row/row-application-history';

interface ApplicationHistoryListProps {
  applications: Application[];
  returnFocusId: number | null;
  onSelect: (id: number) => void;
}

// 지원 내역 모달의 목록 화면이에요. 행을 누르면 상세 화면으로 바뀌어요.
const ApplicationHistoryList = ({
  applications,
  returnFocusId,
  onSelect,
}: ApplicationHistoryListProps) => {
  const returnFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    returnFocusRef.current?.focus();
  }, []);

  return (
    <section className="flex flex-col gap-3">
      <ApplicationHistorySectionHeader
        title="최근 6개월 지원 내역"
        meta={`총 ${applications.length}건`}
      />

      <ul className="flex flex-col gap-3">
        {applications.map((application) => {
          const { label } = APPLICATION_STATUSES[application.status];

          return (
            <li key={application.id}>
              <button
                ref={
                  application.id === returnFocusId ? returnFocusRef : undefined
                }
                type="button"
                aria-label={`${application.companyName} ${application.positionName}, ${label}, 상세 보기`}
                className="group block w-full rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-90"
                onClick={() => onSelect(application.id)}
              >
                <RowApplicationHistory
                  title={`${application.companyName} · ${application.positionName}`}
                  meta={`${application.packageName} · ${application.appliedAt}`}
                  status={application.status}
                  statusLabel={label}
                  logoText={application.companyName.charAt(0)}
                  className="group-hover:bg-surface-subtle group-focus-visible:bg-surface-subtle"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ApplicationHistoryList;
