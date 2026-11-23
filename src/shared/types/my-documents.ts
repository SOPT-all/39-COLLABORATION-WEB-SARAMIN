// 보유 서류 체크 상태. PATCH 요청 body와 응답 data가 같은 모양
// 세 값 모두 필수라 하나만 바꿔도 나머지 두 값을 함께 전송
export interface MyDocuments {
  hasResume: boolean;
  hasCoverLetter: boolean;
  hasCareer: boolean;
}

// 서류 한 종류. id는 MyDocuments의 필드 이름, label은 화면에 보이는 이름
export interface MyDocumentField {
  id: keyof MyDocuments;
  label: string;
}
