// 광고 제목에서 검색어와 겹치는 단어(highlight)는 파란색으로 보여요.
const POWER_LINK_COLUMNS = [
  [
    {
      title: ['', '디자인', ' G마켓'],
      url: 'http://www.gmarket.co.kr',
      description: '디자인 쇼핑에 집중! 최대 5% 적립에 무료반품까지, 특별혜택',
    },
    {
      title: ['유명핫플레이스 홍보조형물제작'],
      url: 'https://blog.naver.com/airbible3',
      description:
        '2~4미터크기 4kg미만, 가벼운 무게로 안전설치가능, 디테일한 조형물 제작 가능',
    },
    {
      title: ['코아이디 페이지 ', '디자인'],
      url: 'https://coidstudio.com/',
      description:
        '아마존네이버 페이지 디자인 및 체계적인 기획, 내부 3D 렌더링 스튜디오 보유',
    },
  ],
  [
    {
      title: ['행사용 공기조형물 제작업체'],
      url: 'https://www.airbible.co.kr',
      description:
        '(주)에어바이블, 전기코드 꽂으면 2~5미터 이상 대형조형물 간단설치와 철거가능',
    },
    {
      title: ['캐릭터 맞춤 대형조형물 제작'],
      url: 'http://www.airbible.com',
      description:
        '전기코드 꽂아서 대형조형물 손쉬운설치, 여러번 반복사용과 간단 철거가능,A/S제공',
    },
    {
      title: ['기업과 사람을 위한 인쇄'],
      url: 'https://www.hanprinting.co.kr/',
      description: '기업사랑디자인은 확실히 다르기 때문에',
    },
  ],
];

const PowerLinkSection = () => {
  return (
    <section
      aria-labelledby="power-link-title"
      className="border border-gray-30 bg-surface-default"
    >
      <div className="flex h-13.5 items-center gap-2 bg-surface-subtle px-5">
        <h2 id="power-link-title" className="text-title-16 text-gray-120">
          파워링크
        </h2>
        <span className="px-1.5 py-1 text-label-12 text-blue-90">
          사람인 Pick!
        </span>
        <a href="#" className="ml-auto text-body-12 text-text-secondary">
          등록안내
        </a>
      </div>

      <div className="flex gap-8 px-5 py-6">
        {POWER_LINK_COLUMNS.map((links) => (
          <ul key={links[0].url} className="flex flex-1 flex-col gap-6">
            {links.map(({ title, url, description }) => (
              <li key={url} className="flex flex-col gap-1.5">
                <a href="#" className="text-title-14 text-gray-120">
                  {title.map((text, index) =>
                    // 홀수 번째 조각이 강조 단어예요.
                    index % 2 === 1 ? (
                      <span key={text} className="text-blue-80">
                        {text}
                      </span>
                    ) : (
                      text
                    ),
                  )}
                </a>
                <span className="text-body-12 text-text-secondary">{url}</span>
                <p className="text-body-12 text-text-secondary">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
};

export default PowerLinkSection;
