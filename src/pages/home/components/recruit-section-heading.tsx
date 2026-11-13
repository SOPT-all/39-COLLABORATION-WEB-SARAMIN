interface RecruitSectionHeadingProps {
  title: string;
  description: string;
  actionLabel: string;
  actionVariant: 'viewAll' | 'deadlineAlert';
}

// TODO(#50 영찬): 디자인 적용 (제목 · 설명 · ChipSectionAction)
const RecruitSectionHeading = ({
  title,
  description,
  actionLabel,
  actionVariant,
}: RecruitSectionHeadingProps) => {
  return (
    <div
      className="flex h-13 items-center justify-between justify-center rounded-2xl border border-dashed border-border-default px-4 text-body-14 text-text-tertiary"
      data-action={actionVariant}
    >
      <h2>
        {title} · {description}
      </h2>
      <span>{actionLabel} (#50)</span>
    </div>
  );
};

export default RecruitSectionHeading;
