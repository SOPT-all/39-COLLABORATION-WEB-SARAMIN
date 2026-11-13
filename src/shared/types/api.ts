// 서버 공통 응답 형식이에요. 성공 · 실패 모두 같은 모양으로 와요.
// 예) { "success": true, "code": 200, "message": "요청에 성공했습니다.", "data": { ... } }
export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

// 실패하면 data가 null로 와요.
// 예) { "success": false, "code": 404, "message": "요청한 리소스를 찾을 수 없습니다.", "data": null }
export type ApiErrorResponse = ApiResponse<null>;

// 페이지네이션 응답이에요. page는 0부터 시작해요.
export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}
