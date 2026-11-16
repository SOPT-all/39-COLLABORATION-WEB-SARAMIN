interface ApplicationHistorySectionHeaderProps {
  title: string;
  meta: string;
}

// 지원 내역 모달 본문 맨 위의 제목 줄이에요.
const ApplicationHistorySectionHeader = ({
  title,
  meta,
}: ApplicationHistorySectionHeaderProps) => {
  return (
    <div className="flex h-7 w-full items-center justify-between gap-8">
      <h3 className="min-w-0 truncate text-label-14 text-text-primary">
        {title}
      </h3>
      <p className="shrink-0 text-right text-caption-12 text-text-secondary">
        {meta}
      </p>
    </div>
  );
};

export default ApplicationHistorySectionHeader;
