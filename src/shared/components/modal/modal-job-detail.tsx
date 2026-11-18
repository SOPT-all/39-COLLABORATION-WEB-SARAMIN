// [스펙] ModalJobDetail
// 역할   : 공고 상세 모달. 홈 공고 카드 제목 · 검색 결과 제목 · 비교 모달 상세보기에서 같이 써요.
// props  : job - 볼 공고 (null이면 닫힘) / onClose
// 내용   : 회사 · 공고명 · 근무지(전체 주소) · 마감 일시 · 근무형태 · 지원 경력 · 학력 · 공고 키워드
//          공고 상세 페이지가 없어서 비교 표보다 자세한 원문 값을 한곳에 모아 보여 줘요.

import { useState } from 'react';

import ModalButton from '@/shared/components/button/modal-button';
import Modal from '@/shared/components/modal/modal';
import RowModalKeyValue from '@/shared/components/row/row-modal-key-value';
import type { CompareJob } from '@/shared/types/compare-job';

const padTwoDigits = (value: number) => String(value).padStart(2, '0');

// '2026-11-18T23:59:59' → '2026.11.18 23:59 (D-Day)' / null → '채용 시 마감'
const convertDeadlineToLabel = ({ deadlineAt, deadline }: CompareJob) => {
  if (!deadlineAt) return '채용 시 마감';
  const date = new Date(deadlineAt);
  return `${date.getFullYear()}.${padTwoDigits(date.getMonth() + 1)}.${padTwoDigits(date.getDate())} ${padTwoDigits(date.getHours())}:${padTwoDigits(date.getMinutes())} (${deadline})`;
};

interface ModalJobDetailProps {
  job: CompareJob | null;
  onClose: () => void;
}

const ModalJobDetail = ({ job, onClose }: ModalJobDetailProps) => {
  // 닫을 때 바로 사라지지 않고 dialog를 닫아야 연 버튼으로 포커스가 돌아가요.
  // 그래서 마지막으로 연 공고를 기억해 두고 isOpen만 바꿔요.
  const [lastJob, setLastJob] = useState(job);
  if (job && job !== lastJob) setLastJob(job);

  const shownJob = job ?? lastJob;
  if (!shownJob) return null;

  return (
    <Modal
      title="공고 상세"
      size="standard"
      isOpen={job !== null}
      onClose={onClose}
      footer={<ModalButton onClick={onClose}>닫기</ModalButton>}
    >
      <div className="flex flex-col gap-1">
        <p className="text-label-12 text-text-secondary">
          {shownJob.companyName}
        </p>
        <p className="text-title-16 text-text-primary">{shownJob.title}</p>
      </div>
      <div>
        <RowModalKeyValue label="근무지" value={shownJob.address} />
        <RowModalKeyValue
          label="마감"
          value={convertDeadlineToLabel(shownJob)}
        />
        <RowModalKeyValue label="근무형태" value={shownJob.hireType} />
        <RowModalKeyValue label="지원 경력" value={shownJob.career} />
        <RowModalKeyValue label="학력" value={shownJob.education} />
        <RowModalKeyValue
          label="키워드"
          value={shownJob.keywords.join(' · ')}
        />
      </div>
    </Modal>
  );
};

export default ModalJobDetail;
