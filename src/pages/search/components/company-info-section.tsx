const COMPANY_FACT_COLUMNS = [
  [
    { label: '설립일', value: '2013년 12월 17일 (업력 14년차)' },
    { label: '업종', value: '인테리어 디자인업' },
    { label: '평균연봉', value: '4,744만원  전체 ›' },
    { label: '합격자료', value: '면접질문·후기 2건' },
  ],
  [
    { label: '대표자명', value: '홍주석' },
    { label: '재무정보', value: '매출액 202.4억 (2025년 기준)  전체 ›' },
    {
      label: '기업주소',
      value: '서울 서대문구 연희로5길 22, 지하 1층, 2층, 3층',
    },
  ],
];

const OPEN_POSITIONS = [
  {
    title: '[콘텐츠유통팀] 판로개척 담당자',
    condition: '서울 서대문구 | 경력3년↑ | 대졸↑',
    deadline: '~11.01(일)',
  },
  {
    title: '[공간OS팀] 공간 기획자 (3년이상 8년이하)',
    condition: '서울 서대문구 | 경력 3~8년 | 대졸↑',
    deadline: '~12.01(화)',
  },
  {
    title: '[경영전략그룹] 제주 성산 기록상점 공간 운영 매니저',
    condition: '제주 제주시 | 경력무관 | 학력무관',
    deadline: '~11.20(금)',
  },
  {
    title: '[경영전략그룹] 브랜드 MD / 공간운영 매니저',
    condition: '서울 서대문구 | 경력3년↑ | 학력무관',
    deadline: '채용시',
  },
];

const CompanyInfoSection = () => {
  return (
    <section
      aria-labelledby="company-info-title"
      className="overflow-hidden rounded-2xl border border-gray-30 bg-surface-default"
    >
      <div className="flex h-15 items-center gap-3 px-10">
        <h3 id="company-info-title" className="text-heading-20 text-gray-120">
          기업정보
        </h3>
        <span className="text-body-12 text-gray-70">총 49,094건</span>
      </div>

      <article className="flex flex-col gap-4 px-10 pt-6">
        <div className="flex h-6 items-center gap-2">
          <h4 className="text-heading-18 text-gray-120">(주)어반플레이</h4>
          <button
            type="button"
            aria-label="관심기업 등록"
            className="text-[20px] leading-5 text-gray-40"
          >
            ♡
          </button>
          <a href="#" className="text-body-12 text-gray-120">
            진행중 채용공고 4건 &gt;
          </a>
          <span className="ml-auto text-body-12 whitespace-pre text-gray-70">
            나의 커리어 첫 시작 ◀ ▣ ▶
          </span>
        </div>

        <div className="flex gap-6 border border-gray-30 bg-surface-subtle py-6 pr-5 pl-7.5 text-body-12">
          {COMPANY_FACT_COLUMNS.map((facts) => (
            <dl key={facts[0].label} className="flex flex-1 flex-col gap-2">
              {facts.map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <dt className="w-17.5 shrink-0 text-gray-70">{label}</dt>
                  <dd className="whitespace-pre text-text-secondary">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          ))}
        </div>

        <ul className="text-body-12">
          {OPEN_POSITIONS.map(({ title, condition, deadline }) => (
            <li
              key={title}
              className="flex min-h-11.25 items-center gap-3 border-b border-gray-30"
            >
              <span className="w-21.25 shrink-0 text-center text-blue-80">
                채용중
              </span>
              <a href="#" className="min-w-45 flex-1 text-gray-120">
                {title}
              </a>
              <span className="max-w-54 min-w-35 flex-1 text-gray-70">
                {condition}
              </span>
              <span className="w-18 shrink-0 text-right text-gray-70">
                {deadline}
              </span>
              <a
                href="#"
                className="flex h-6 w-22.25 shrink-0 items-center justify-center rounded-[3px] border border-gray-30 bg-surface-default text-label-12 text-blue-90"
              >
                홈페이지 지원
              </a>
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
