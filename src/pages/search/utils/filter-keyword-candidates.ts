import { MY_FIT_KEYWORD_CANDIDATE_GROUPS } from '@/pages/search/constants/my-fit-keyword-candidates';
import type { SearchKeywordGroup } from '@/shared/components/list/list-search';

// 묶음마다 보여 줄 후보 수. 목록이 너무 길어지지 않게 잘라요.
const MAX_CANDIDATES_PER_GROUP = 5;

const normalize = (value: string) => value.trim().toLowerCase();

// 입력한 글자가 들어간 키워드 후보만 묶음별로 남겨요. (대소문자 무시)
// 이미 고른 키워드는 빼고, 후보가 없는 묶음은 통째로 빼요.
export const filterKeywordCandidates = (
  input: string,
  selectedKeywords: string[],
): SearchKeywordGroup[] => {
  const query = normalize(input);
  if (!query) return [];

  const selected = new Set(selectedKeywords.map(normalize));

  return MY_FIT_KEYWORD_CANDIDATE_GROUPS.map(({ title, keywords }) => ({
    title,
    keywords: keywords
      .filter(
        (keyword) =>
          normalize(keyword).includes(query) &&
          !selected.has(normalize(keyword)),
      )
      .slice(0, MAX_CANDIDATES_PER_GROUP),
  })).filter(({ keywords }) => keywords.length > 0);
};

// Enter로 확정할 후보예요. 입력과 똑같은 키워드가 있으면 그것, 없으면 첫 후보예요.
export const getKeywordCandidateToSubmit = (
  input: string,
  candidateGroups: SearchKeywordGroup[],
) => {
  const candidates = candidateGroups.flatMap(({ keywords }) => keywords);
  return (
    candidates.find((keyword) => normalize(keyword) === normalize(input)) ??
    candidates[0]
  );
};
