// [스펙] CareerToolsSection
// 역할   : 홈 "취업 준비, 한 번에 끝내기" 섹션. 제목 줄 아래에 취업 준비 도구 9개를 한 줄로 늘어놓음
// props  : 없음. 도구 순서는 tool-quick-polish-tools.ts 표 순서 그대로
// 구조   : [제목 / 설명]                    [도구 전체보기 버튼]
//          [ToolQuickPolish × 9]            ← 1260px 안에 양끝 정렬 (간격 22.5px)
// 동작   : 도구 · 전체보기 버튼은 이동할 페이지가 없어서 클릭 연결 없음
// 접근성 : section + h2. 도구는 ul / li

import ToolQuickPolish from '@/shared/components/tool/tool-quick-polish';
import { TOOL_QUICK_POLISH_KEYS } from '@/shared/components/tool/tool-quick-polish-tools';

const CareerToolsSection = () => {
  return (
    <section className="pt-18 pb-20">
      <div className="mx-auto flex w-315 flex-col gap-6">
        <header className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-heading-24 text-text-primary">
              취업 준비, 한 번에 끝내기
            </h2>
            <p className="text-body-14 text-text-secondary">
              서류 준비부터 연봉 계산까지, 필요한 순간 바로 꺼내 쓰세요.
            </p>
          </div>
          <button
            type="button"
            className="flex h-10 shrink-0 items-center rounded-full border border-border-default bg-surface-default px-4.5 text-label-14 text-text-primary"
          >
            도구 전체보기
          </button>
        </header>
        <ul className="flex justify-between">
          {TOOL_QUICK_POLISH_KEYS.map((tool) => (
            <li key={tool}>
              <ToolQuickPolish tool={tool} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CareerToolsSection;
