import BackToTopButton from '@/shared/components/button/back-to-top-button';
import SearchUtilityButton from '@/shared/components/button/search-utility-button';

const UTILITY_LABELS = [
  '검색 의견 보내기',
  '불량 게시물 신고',
  '광고상품 안내',
];

const SearchUtilities = () => {
  return (
    <div className="flex h-33 items-center justify-center">
      {UTILITY_LABELS.map((label) => (
        <SearchUtilityButton key={label}>{label}</SearchUtilityButton>
      ))}
      <BackToTopButton />
    </div>
  );
};

export default SearchUtilities;
