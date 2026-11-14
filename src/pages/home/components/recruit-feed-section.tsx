import RecruitSectionHeading from '@/pages/home/components/recruit-section-heading';
import { MOCK_RECRUITS } from '@/pages/home/constants/mock-recruits';
import { RECRUIT_SECTIONS } from '@/pages/home/constants/recruit-sections';
import type { ApplyFilter } from '@/pages/home/types/recruit';

interface RecruitFeedSectionProps {
  selectedFilter: ApplyFilter | null;
}

// TODO(#52 지영): 공고 카드 자리를 공고 카드 컴포넌트(#29)로 교체
// 섹션 구성 · 필터 반영은 이미 연결돼 있어요.
const RecruitFeedSection = ({ selectedFilter }: RecruitFeedSectionProps) => {
  return (
    <>
      {RECRUIT_SECTIONS.map(({ type, ...heading }) => {
        const recruits = MOCK_RECRUITS[type].filter(
          ({ applyStatus }) =>
            !selectedFilter || applyStatus === selectedFilter,
        );

        return (
          <section key={type} className="flex flex-col gap-6">
            <RecruitSectionHeading {...heading} />
            <ul className="grid grid-cols-2 gap-4">
              {recruits.map(({ id, companyName, title }) => (
                <li
                  key={id}
                  className="flex h-63 items-center justify-center rounded-2xl border border-dashed border-border-default text-body-14 text-text-tertiary"
                >
                  공고 카드 (#52) · {companyName} {title}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
};

export default RecruitFeedSection;
