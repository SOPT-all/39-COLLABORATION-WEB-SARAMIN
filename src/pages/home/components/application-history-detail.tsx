import { useEffect, useRef } from 'react';

import ApplicationHistorySectionHeader from '@/pages/home/components/application-history-section-header';
import { APPLICATION_STATUSES } from '@/pages/home/constants/application-statuses';
import type { Application } from '@/pages/home/types/application';
import RowApplicationHistory from '@/shared/components/row/row-application-history';
import RowModalKeyValue from '@/shared/components/row/row-modal-key-value';

import IcModalInfo from '@/shared/assets/icons/ic-modal-info.svg?react';

interface ApplicationHistoryDetailProps {
  application: Application;
}

// 지원 내역 모달의 상세 화면이에요. 공고 요약 · 지원 정보 · 상태 안내를 보여줘요.
const ApplicationHistoryDetail = ({
  application,
}: ApplicationHistoryDetailProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { label, detailLabel } = APPLICATION_STATUSES[application.status];
  const { appliedAt } = application;

  useEffect(() => {
    sectionRef.current?.focus();
  }, []);

  const infoRows = [
    { label: '지원일', value: appliedAt },
    {
      label: '제출 서류',
      value: application.submittedDocuments
        .map((document) => `${document.name} ${document.count}`)
        .join(' · '),
    },
    { label: '현재 상태', value: detailLabel },
    { label: '지원 경로', value: application.applyChannel },
  ];

  return (
    <section
      ref={sectionRef}
      tabIndex={-1}
      aria-label={`${application.companyName} 지원 상세`}
      className="flex flex-col gap-3 outline-none"
    >
      <RowApplicationHistory
        title={`${application.companyName} · ${application.positionName}`}
        meta={`${application.packageName} · ${appliedAt}`}
        status={application.status}
        statusLabel={label}
        logoText={application.companyName.charAt(0)}
      />

      <ApplicationHistorySectionHeader
        title="지원 정보"
        meta={`접수 번호 ${application.receiptNumber}`}
      />
      {infoRows.map((row) => (
        <RowModalKeyValue key={row.label} label={row.label} value={row.value} />
      ))}

      <div className="flex h-18 items-center gap-3 rounded-xl bg-surface-blue-subtle p-4">
        <IcModalInfo aria-hidden className="shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="text-label-14 text-text-primary">지원 상태 안내</p>
          <p className="text-caption-12 text-text-secondary">
            기업의 채용 일정에 따라 상태 변경까지 시간이 걸릴 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ApplicationHistoryDetail;
