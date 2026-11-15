import ChipSectionAction from '@/shared/components/chip/chip-section-action';

interface RecruitSectionHeadingProps {
  title: string;
  description: string;
  actionLabel: string;
  actionVariant: 'viewAll' | 'deadlineAlert';
  onActionClick?: () => void;
}

// 공고 피드 섹션의 제목 · 설명 · 오른쪽 버튼(전체보기 · 마감 알림)이에요.
const RecruitSectionHeading = ({
  title,
  description,
  actionLabel,
  actionVariant,
  onActionClick,
}: RecruitSectionHeadingProps) => {
  return (
    <header className="flex h-13 items-center justify-between">
      <div className="flex flex-col gap-1">
        <h2 className="text-heading-18 text-text-primary">{title}</h2>
        <p className="text-caption-11 text-text-tertiary">{description}</p>
      </div>
      <ChipSectionAction variant={actionVariant} onClick={onActionClick}>
        {actionLabel}
      </ChipSectionAction>
    </header>
  );
};

export default RecruitSectionHeading;
