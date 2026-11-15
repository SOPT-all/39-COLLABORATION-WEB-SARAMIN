// 두 글자 줄임이 앞 · 셋째 글자인 도 이름이에요. (충청북도 → 충북)
const SPLIT_PROVINCE_PREFIXES = ['충청', '전라', '경상'];
const MIN_NAME_LENGTH_TO_TRIM = 3;
const DISTRICT_SUFFIXES = ['시', '군', '구'];

const isDistrict = (name: string) =>
  DISTRICT_SUFFIXES.some((suffix) => name.endsWith(suffix));

const convertProvince = (province: string) =>
  SPLIT_PROVINCE_PREFIXES.some((prefix) => province.startsWith(prefix))
    ? `${province[0]}${province[2]}`
    : province.slice(0, 2);

// '강남구' → '강남', '중구'처럼 두 글자면 그대로 둬요.
const trimDistrictSuffix = (name: string) =>
  name.length >= MIN_NAME_LENGTH_TO_TRIM ? name.slice(0, -1) : name;

// 회사 주소를 공고 카드용 지역으로 바꿔요.
// '서울특별시 강남구 테헤란로 120' → '서울 강남' / '경기도 성남시 분당구 …' → '성남 분당'
// '세종특별자치시 한누리대로 …' → '세종'
export const convertAddressToRegion = (address: string) => {
  const [province = '', city = '', district = ''] = address.split(' ');

  // 시 아래에 구가 있으면 '시 구'로 보여 줘요.
  if (city.endsWith('시') && district.endsWith('구')) {
    return `${trimDistrictSuffix(city)} ${trimDistrictSuffix(district)}`;
  }

  // 세종처럼 시 · 군 · 구 없이 도로명이 바로 오면 시 · 도만 보여 줘요.
  if (!isDistrict(city)) return convertProvince(province);

  return `${convertProvince(province)} ${trimDistrictSuffix(city)}`;
};
