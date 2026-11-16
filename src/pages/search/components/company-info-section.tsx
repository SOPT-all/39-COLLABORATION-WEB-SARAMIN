import {
  MOCK_COMPANY_INFO,
  MOCK_COMPANY_TOTAL,
} from '@/pages/search/constants/mock-search';
import ListCompanyFact from '@/shared/components/list/list-company-fact';
import ListCompanyPosition from '@/shared/components/list/list-company-position';

const CompanyInfoSection = () => {
  return (
    <section
      aria-labelledby="company-info-title"
      className="overflow-hidden rounded-2xl border border-gray-30 bg-surface-default"
    >
      <div className="flex h-15 items-center gap-3 px-10">
        <h2 id="company-info-title" className="text-heading-20 text-gray-120">
          기업정보
        </h2>
        <span className="text-body-12 text-gray-70">
          총 {MOCK_COMPANY_TOTAL.toLocaleString()}건
        </span>
      </div>

      <article className="flex flex-col gap-4 px-10 pt-6">
        <div className="flex h-6 items-center gap-2">
          <h3 className="text-heading-18 text-gray-120">
            {MOCK_COMPANY_INFO.name}
          </h3>
          <button
            type="button"
            aria-label="관심기업 등록"
            className="text-[20px] leading-5 text-gray-40"
          >
            ♡
          </button>
          <a href="#" className="text-body-12 text-gray-120">
            진행중 채용공고 {MOCK_COMPANY_INFO.positions.length}건 &gt;
          </a>
          <span className="ml-auto text-body-12 whitespace-pre text-gray-70">
            나의 커리어 첫 시작 ◀ ▣ ▶
          </span>
        </div>

        <div className="flex gap-6 border border-gray-30 bg-surface-subtle py-6 pr-5 pl-7.5 text-body-12">
          {MOCK_COMPANY_INFO.factColumns.map((facts) => (
            <div key={facts[0].label} className="flex flex-1 flex-col gap-2">
              {facts.map(({ label, value }) => (
                <ListCompanyFact key={label} label={label} value={value} />
              ))}
            </div>
          ))}
        </div>

        {/* TODO: 공고 상세·지원 URL이 정해지면 ListCompanyPosition의 제목과 지원 배지에 링크를 연결해요. */}
        <ul className="text-body-12">
          {MOCK_COMPANY_INFO.positions.map(({ title, condition, deadline }) => (
            <li key={title}>
              <ListCompanyPosition
                status="채용중"
                title={title}
                meta={condition}
                deadline={deadline}
                badge="홈페이지 지원"
              />
            </li>
          ))}
        </ul>
      </article>

      <div className="flex h-11.5 items-center justify-end pr-10">
        <a href="#" className="text-body-12 text-gray-70">
          기업정보 더보기 ›
        </a>
      </div>
    </section>
  );
};

export default CompanyInfoSection;
