const PROGRESS_STEP = 17;
const PROGRESS_INTERVAL_MS = 250;
const MAX_PROGRESS = 100;

export type MockUploadResult = 'success' | 'error';

interface UploadDocumentOptions {
  file: File;
  onProgress: (progress: number) => void;
  signal: AbortSignal;
}

// 서류 업로드 API가 없어서 진행률만 흉내 내는 목 업로드 함수예요.
// result로 성공 · 실패를 고를 수 있어요. (Storybook · 테스트용)
export const createMockUploadDocument =
  (result: MockUploadResult = 'success') =>
  ({ onProgress, signal }: UploadDocumentOptions) =>
    new Promise<void>((resolve, reject) => {
      let progress = 0;

      const timer = setInterval(() => {
        progress = Math.min(progress + PROGRESS_STEP, MAX_PROGRESS);
        onProgress(progress);

        if (progress < MAX_PROGRESS) return;
        clearInterval(timer);
        if (result === 'success') resolve();
        else reject(new Error('서류 업로드 실패'));
      }, PROGRESS_INTERVAL_MS);

      // 업로드 중 취소하면 진행을 멈춰요.
      signal.addEventListener('abort', () => {
        clearInterval(timer);
        reject(new DOMException('업로드 취소', 'AbortError'));
      });
    });
