import { useRef, useState } from 'react';

import type { DocumentFile } from '@/pages/home/types/document-file';
import { convertFileSizeToLabel } from '@/pages/home/utils/convert-file-size-to-label';
import {
  checkIsValidDocumentFile,
  getFileExtension,
} from '@/pages/home/utils/get-document-file-info';

// 서류 추가(select) → 업로드 중(uploading) → 서류 확인(review) / 실패(error)
export type DocumentUploadStep = 'select' | 'uploading' | 'review' | 'error';

// invalid: 지원하지 않는 형식이거나 20MB 초과 / failed: 업로드 요청 실패
export type DocumentUploadError = 'invalid' | 'failed';

interface UploadDocumentOptions {
  file: File;
  onProgress: (progress: number) => void;
  signal: AbortSignal;
}

interface UseDocumentUploadOptions {
  uploadDocument: (options: UploadDocumentOptions) => Promise<void>;
  onUseDocument: (document: DocumentFile) => void;
}

const isAbortError = (error: unknown) =>
  error instanceof DOMException && error.name === 'AbortError';

// 서류 추가 플로우의 단계를 관리해요. 업로드는 받은 함수(목 업로드)로 해요.
export const useDocumentUpload = ({
  uploadDocument,
  onUseDocument,
}: UseDocumentUploadOptions) => {
  const [step, setStep] = useState<DocumentUploadStep>('select');
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<DocumentUploadError | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const stopUpload = () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
  };

  const upload = async (targetFile: File) => {
    stopUpload();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setStep('uploading');
    setProgress(0);
    setError(null);

    try {
      await uploadDocument({
        file: targetFile,
        onProgress: setProgress,
        signal: abortController.signal,
      });
      setStep('review');
    } catch (uploadError) {
      // 취소는 실패가 아니라 처음 단계로 돌아간 거예요.
      if (isAbortError(uploadError)) return;
      setError('failed');
      setStep('error');
    } finally {
      if (abortControllerRef.current === abortController) {
        abortControllerRef.current = null;
      }
    }
  };

  const selectFile = (selectedFile: File) => {
    setFile(selectedFile);

    if (!checkIsValidDocumentFile(selectedFile)) {
      stopUpload();
      setError('invalid');
      setStep('error');
      return;
    }

    void upload(selectedFile);
  };

  // 실패한 파일을 그대로 다시 올려요.
  const retry = () => {
    if (file && error === 'failed') void upload(file);
  };

  // 업로드 취소 · 다른 파일 선택 · 모달 닫기 때 처음 단계로 돌려요.
  const reset = () => {
    stopUpload();
    setStep('select');
    setFile(null);
    setProgress(0);
    setError(null);
  };

  // 업로드한 파일을 서류 목록에 넣고 처음 단계로 돌려요.
  const confirmDocument = () => {
    if (!file) return;

    onUseDocument({
      id: Date.now(),
      fileName: file.name,
      format: getFileExtension(file.name).toUpperCase(),
      sizeLabel: convertFileSizeToLabel(file.size),
      updatedAt: new Date().toISOString(),
      status: 'ready',
    });
    reset();
  };

  return {
    step,
    file,
    progress,
    error,
    selectFile,
    retry,
    reset,
    confirmDocument,
  };
};
