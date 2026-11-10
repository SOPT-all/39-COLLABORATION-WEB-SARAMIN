import ChipTool from '@/shared/components/chip/chip-tool';

const DOCUMENT_TOOLS = [
  {
    variant: 'blue',
    title: '이력서 완성도 진단',
    description: '필수 항목과 최근 업데이트를 확인해요',
  },
  {
    variant: 'green',
    title: '자기소개서 문항 매칭',
    description: '공고별 문항에 맞는 자소서를 추천해요',
  },
  {
    variant: 'red',
    title: '경력기술서 보완',
    description: '직무 키워드와 성과 표현을 점검해요',
  },
] as const;

const DocumentToolsSection = () => {
  return (
    <section className="flex flex-col items-center gap-5 bg-surface-subtle pt-14 pb-16">
      <h2 className="w-315 text-heading-24 text-text-primary">
        지원 패키지를 더 탄탄하게
      </h2>
      <ul className="flex w-315 gap-4">
        {DOCUMENT_TOOLS.map(({ variant, title, description }) => (
          <li
            key={title}
            className="flex h-37.5 w-102.25 flex-col items-start gap-2.5 rounded-2xl border border-border-default bg-surface-default p-5"
          >
            <ChipTool variant={variant}>서류 준비</ChipTool>
            <h3 className="text-title-16 text-text-primary">{title}</h3>
            <p className="text-body-14 text-text-secondary">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DocumentToolsSection;
