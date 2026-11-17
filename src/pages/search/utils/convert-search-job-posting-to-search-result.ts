// | 서버 값 | 화면 값 |
// | --- | --- |
// | `title`, `companyName`, `id` | 그대로 사용 |
// | `matchedKeywords` | `join(' · ')` |
// | `matchedKeywords.length` | 일치 개수 |
// | `deadlineAt` | `convertDeadlineToDday` |
// | 주소·경력·학력·고용형태 | 화면의 `meta` 문자열 |
// | 북마크 필드 없음 | `isBookmarked: false` |
// | `ranking` | `companyMeta: ''` |

import type {
  SearchJobPostingResponse,
  SearchResult,
} from '@/pages/search/types/search';
import { convertAddressToRegion } from '@/shared/utils/convert-address-to-region';
import { convertCareerYears } from '@/shared/utils/convert-career-years';
import { convertDeadlineToDday } from '@/shared/utils/convert-deadline-to-dday';

//서버에서 받은 공고 데이터를 화면에서 보여줄 검색결과 데이터로 변환해요.
export const convertSearchJobPostingToSearchResult = (
  jobPosting: SearchJobPostingResponse,
): SearchResult => ({
  id: jobPosting.id,
  title: jobPosting.title,
  companyName: jobPosting.companyName,
  matchCount: jobPosting.matchedKeywords.length,
  matchedKeywords: jobPosting.matchedKeywords.join(' · '),
  deadline: convertDeadlineToDday(jobPosting.deadlineAt),
  meta: [
    convertAddressToRegion(jobPosting.companyAddress),
    convertCareerYears(jobPosting.minCareerYears, jobPosting.maxCareerYears),
    jobPosting.requiredEducation,
    jobPosting.hireType,
  ].join(' · '),
  companyMeta: '', // TODO: ranking을 활용한 회사 메타 정보 표시 여부 결정
  isBookmarked: false, // TODO: 북마크 API 연동 후 북마크 상태 표시
});
