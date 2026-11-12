import { MOCK_POWER_LINK_COLUMNS } from '@/pages/search/constants/mock-search';

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
        {MOCK_POWER_LINK_COLUMNS.map((links) => (
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
