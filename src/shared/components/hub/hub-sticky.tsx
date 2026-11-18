// [스펙] HubSticky
// 역할   : 홈 왼쪽에 고정되는 "나의 취업 in" 카드. 서류 준비 상태를 보여주고 지원 패키지를 끌어가는 출발점
// props  : status - ready · dragging · needsDocument · unready · loading (기본 ready)
//          size - full · compact (기본 full). compact는 헤더 + 패키지 카드 + 푸터만
//          documents - 서류 행 목록 [{ id, label, state, count }]. 기본값 피그마 3개
//          badge · summaryTitle · summaryDescription - API 값이 들어갈 문구. 안 주면 상태 표의 피그마 문구
//          bundleTitle · bundleMeta - 지원 패키지 카드 문구. 안 주면 피그마 문구
//          bundleProps - 지원 패키지 카드(BundleApplication)에 그대로 넘기는 속성. draggable · onDragStart 등 드래그 연결용
//          onDocumentClick - 서류 행을 누르면 그 행의 id를 넘김. 체크 변경 연결용
//          onDocumentManageClick · onApplicationHistoryClick - 푸터 버튼 클릭
//          className, 나머지 div 속성 통과 (허브 바깥 div)
// 상태   : status 하나로 뱃지 문구 · 뱃지 색 · 안내 문구 · 요약 카드 tone/문구 · 패키지 카드 state · 바깥 흰 테두리가 정해짐
//          흰 테두리는 안쪽 outline으로 그려서 상태가 바뀌어도 안쪽 크기가 그대로임
//          hub-sticky-states.ts 표에서 꺼냄. loading이면 본문 대신 SkeletonStickyHub
// 구조   : [헤더: 제목 + BadgeStickyStatus / 안내 문구]
//          [ReadinessSummary]            ← compact 땐 없음
//          [RowStickyDocument × n]       ← compact 땐 없음
//          [BundleApplication]
//          [StickyFooterButton │ StickyFooterButton]
// 재사용 : 주형 님 BadgeStickyStatus · 희진 님 RowStickyDocument · 지영 님 BundleApplication · SkeletonStickyHub · ReadinessSummary · StickyFooterButton
// 접근성 : div. aria-label은 레일 섹션(aside)이 가짐. loading이면 aria-busy

import type { ComponentProps } from 'react';

import BadgeStickyStatus from '@/shared/components/badge/badge-sticky-status';
import BundleApplication from '@/shared/components/bundle-application/bundle-application';
import StickyFooterButton from '@/shared/components/button/sticky-footer-button';
import {
  HUB_STICKY_STATES,
  type HubStickyStatus,
} from '@/shared/components/hub/hub-sticky-states';
import ReadinessSummary from '@/shared/components/hub/readiness-summary';
import RowStickyDocument from '@/shared/components/row/row-sticky-document';
import SkeletonStickyHub from '@/shared/components/skeleton/skeleton-sticky-hub';
import { cn } from '@/shared/utils/cn';

// id : 눌린 행을 구분하는 값. 페이지에서 API 필드 이름(hasResume 등)을 넣음
interface HubStickyDocument extends Pick<
  ComponentProps<typeof RowStickyDocument>,
  'label' | 'state' | 'count'
> {
  id: string;
}

const DEFAULT_BUNDLE_TITLE = '지원 패키지';
const DEFAULT_BUNDLE_META = '필수 서류 3개 · 최신';

const DEFAULT_DOCUMENTS: HubStickyDocument[] = [
  { id: 'resume', label: '이력서', count: 1 },
  { id: 'coverLetter', label: '자기소개서', count: 1 },
  { id: 'career', label: '경력기술서', count: 1 },
];

interface HubStickyProps extends ComponentProps<'div'> {
  status?: HubStickyStatus;
  size?: 'full' | 'compact';
  documents?: HubStickyDocument[];
  badge?: string;
  summaryTitle?: string;
  summaryDescription?: string;
  bundleTitle?: string;
  bundleMeta?: string;
  bundleProps?: ComponentProps<'section'>;
  onDocumentClick?: (id: string) => void;
  onDocumentManageClick?: () => void;
  onApplicationHistoryClick?: () => void;
}

const HubSticky = ({
  status = 'ready',
  size = 'full',
  documents = DEFAULT_DOCUMENTS,
  badge: badgeProp,
  summaryTitle: summaryTitleProp,
  summaryDescription: summaryDescriptionProp,
  bundleTitle = DEFAULT_BUNDLE_TITLE,
  bundleMeta = DEFAULT_BUNDLE_META,
  bundleProps,
  onDocumentClick,
  onDocumentManageClick,
  onApplicationHistoryClick,
  className,
  ...props
}: HubStickyProps) => {
  const { badgeVariant, description, summaryTone, bundleState, isOutlined } =
    HUB_STICKY_STATES[status];
  const badge = badgeProp ?? HUB_STICKY_STATES[status].badge;
  const summaryTitle =
    summaryTitleProp ?? HUB_STICKY_STATES[status].summaryTitle;
  const summaryDescription =
    summaryDescriptionProp ?? HUB_STICKY_STATES[status].summaryDescription;
  const isLoading = status === 'loading';
  const isFull = size === 'full';

  return (
    <div
      aria-busy={isLoading}
      className={cn(
        'flex w-69 flex-col gap-6 rounded-[22px] bg-blue-90 p-4 shadow-card-strong',
        isOutlined && 'outline-2 -outline-offset-2 outline-white',
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <SkeletonStickyHub className="p-0" />
      ) : (
        <>
          <header className="flex flex-col gap-1">
            <div className="flex h-8 items-center justify-between">
              <h2 className="text-heading-18 text-white">나의 취업 in</h2>
              <BadgeStickyStatus variant={badgeVariant}>
                {badge}
              </BadgeStickyStatus>
            </div>
            <p className="truncate text-body-14 text-white">{description}</p>
          </header>

          <div className="flex flex-col gap-2.5">
            {isFull && (
              <>
                <ReadinessSummary
                  tone={summaryTone}
                  title={summaryTitle}
                  description={summaryDescription}
                />
                <ul className="flex flex-col gap-0.5 rounded-xl bg-surface-default p-2">
                  {documents.map(({ id, ...document }) => (
                    <li key={id}>
                      <RowStickyDocument
                        {...document}
                        onClick={() => onDocumentClick?.(id)}
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}
            <BundleApplication
              {...bundleProps}
              title={bundleTitle}
              meta={bundleMeta}
              state={bundleState}
            />
          </div>

          <footer className="flex h-11 items-center">
            <StickyFooterButton onClick={onDocumentManageClick}>
              서류 관리
            </StickyFooterButton>
            <span aria-hidden className="h-4 w-px bg-white" />
            <StickyFooterButton onClick={onApplicationHistoryClick}>
              지원 내역
            </StickyFooterButton>
          </footer>
        </>
      )}
    </div>
  );
};

export default HubSticky;
