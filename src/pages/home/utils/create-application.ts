import type { Application } from '@/pages/home/types/application';
import {
  MY_DOCUMENT_FIELDS,
  READY_DOCUMENT_COUNT,
} from '@/shared/constants/my-documents';
import type { ApplyTarget } from '@/shared/types/apply-flow';
import type { MyDocuments } from '@/shared/types/my-documents';

const PACKAGE_NAME = '지원 패키지';
const APPLY_CHANNEL = '사람인 즉시 지원';
const RECEIPT_SEQUENCE_LENGTH = 4;

const padTwoDigits = (value: number) => String(value).padStart(2, '0');

// 방금 지원한 공고를 지원 내역 한 건으로 만들어요.
// 지원 API가 없어서 접수 번호 · 지원 일시는 화면에서 만들고, 새로고침하면 사라져요.
// 지원 일시 '2026.11.07 14:32', 접수 번호 'AP-20261107-0022'(뒤 4자리는 공고 id)
export const createApplication = (
  target: ApplyTarget,
  myDocuments: MyDocuments | undefined,
  appliedAt: Date = new Date(),
): Application => {
  const year = appliedAt.getFullYear();
  const month = padTwoDigits(appliedAt.getMonth() + 1);
  const date = padTwoDigits(appliedAt.getDate());
  const time = `${padTwoDigits(appliedAt.getHours())}:${padTwoDigits(appliedAt.getMinutes())}`;
  const sequence = String(target.recruitId).padStart(
    RECEIPT_SEQUENCE_LENGTH,
    '0',
  );

  return {
    // 목 지원 내역 id(1부터)와 겹치지 않게 지원 시각을 써요.
    id: appliedAt.getTime(),
    receiptNumber: `AP-${year}${month}${date}-${sequence}`,
    companyName: target.companyName,
    positionName: target.positionName,
    packageName: PACKAGE_NAME,
    appliedAt: `${year}.${month}.${date} ${time}`,
    applyChannel: APPLY_CHANNEL,
    // 보유 서류를 못 받았으면 지원 확인창 기본 문구와 같이 세 서류를 모두 보여 줘요.
    submittedDocuments: MY_DOCUMENT_FIELDS.filter(
      ({ id }) => !myDocuments || myDocuments[id],
    ).map(({ label }) => ({ name: label, count: READY_DOCUMENT_COUNT })),
    status: 'submitted',
  };
};
