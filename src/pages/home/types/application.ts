// 지원 내역의 진행 상태
export type ApplicationStatus =
  | 'submitted' // 지원 완료
  | 'viewed' // 열람
  | 'under_review' // 검토 중
  | 'interview'; // 면접

export interface SubmittedDocument {
  name: string;
  count: number;
}

// 지원 내역 모달에 필요한 데이터 (지원 내역 API가 없어서 목 데이터 기준)
export interface Application {
  id: number;
  receiptNumber: string;
  companyName: string;
  positionName: string;
  packageName: string;
  appliedAt: string;
  applyChannel: string;
  submittedDocuments: SubmittedDocument[];
  status: ApplicationStatus;
}
