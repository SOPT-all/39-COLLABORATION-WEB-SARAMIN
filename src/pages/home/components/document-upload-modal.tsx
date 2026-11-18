// [스펙] DocumentUploadModal
// 역할   : 지원 서류 관리 모달의 "서류 추가"로 여는 서류 추가 · 업로드 · 확인 모달
// props  : isOpen · onClose - 열림 상태와 닫기 (지원 서류 관리 모달로 돌아감)
//          uploadDocument - 업로드 함수. API가 없어 기본은 목 업로드(항상 성공)
// 단계   : select(서류 추가) → uploading(서류 업로드) → review(서류 확인) / error(서류 업로드 실패)
//          uploading은 닫기 버튼 · ESC · 배경 클릭으로 닫히지 않고, "취소"로만 멈춤
// 파일   : 드롭 영역에 끌어다 놓거나 "파일 선택"으로 골라요. PDF/DOCX/HWP · 20MB 이하만 받아요.

import { type ChangeEvent, useRef } from 'react';

import { createMockUploadDocument } from '@/pages/home/api/create-mock-upload-document';
import ApplicationHistorySectionHeader from '@/pages/home/components/application-history-section-header';
import UploadDropZone from '@/pages/home/components/upload-drop-zone';
import UploadFileRow from '@/pages/home/components/upload-file-row';
import UploadNotice from '@/pages/home/components/upload-notice';
import { DOCUMENT_FILE_ACCEPT } from '@/pages/home/constants/document-upload';
import { useAddDocumentFile } from '@/pages/home/hooks/use-document-files';
import { useDocumentUpload } from '@/pages/home/hooks/use-document-upload';
import { convertFileSizeToLabel } from '@/pages/home/utils/convert-file-size-to-label';
import {
  getDocumentType,
  getFileExtension,
} from '@/pages/home/utils/get-document-file-info';
import ModalButton from '@/shared/components/button/modal-button';
import Modal from '@/shared/components/modal/modal';
import RowModalKeyValue from '@/shared/components/row/row-modal-key-value';

const DEFAULT_UPLOAD_DOCUMENT = createMockUploadDocument('success');

const STEP_TITLES = {
  select: '서류 추가',
  uploading: '서류 업로드',
  error: '서류 업로드',
  review: '서류 확인',
};

const padTwoDigits = (value: number) => String(value).padStart(2, '0');

// 마지막 수정 시각을 '2026.11.07 14:32'로 보여 줘요.
const convertDateToLabel = (date: Date) =>
  `${date.getFullYear()}.${padTwoDigits(date.getMonth() + 1)}.${padTwoDigits(date.getDate())} ${padTwoDigits(date.getHours())}:${padTwoDigits(date.getMinutes())}`;

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  uploadDocument?: Parameters<typeof useDocumentUpload>[0]['uploadDocument'];
}

const DocumentUploadModal = ({
  isOpen,
  onClose,
  uploadDocument = DEFAULT_UPLOAD_DOCUMENT,
}: DocumentUploadModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addDocumentFile = useAddDocumentFile();
  const {
    step,
    file,
    progress,
    error,
    selectFile,
    retry,
    reset,
    confirmDocument,
  } = useDocumentUpload({ uploadDocument, onUseDocument: addDocumentFile });

  const isUploading = step === 'uploading';

  const openFilePicker = () => fileInputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    // 같은 파일을 다시 골라도 change가 일어나게 비워 둬요.
    e.target.value = '';
    if (selectedFile) selectFile(selectedFile);
  };

  // 업로드 중에는 중복 업로드를 막으려고 닫히지 않아요. (ESC · 배경 클릭 포함)
  const handleClose = () => {
    if (isUploading) return;
    reset();
    onClose();
  };

  const handleConfirm = () => {
    confirmDocument();
    onClose();
  };

  const handleSelectAnother = () => {
    reset();
    openFilePicker();
  };

  const extension = file ? getFileExtension(file.name) : '';
  const sizeLabel = file ? convertFileSizeToLabel(file.size) : '';

  const renderContent = () => {
    if (step === 'select') {
      return (
        <>
          <UploadDropZone
            status="idle"
            title="파일을 끌어다 놓거나 직접 선택해 주세요"
            description="이력서, 자기소개서, 경력기술서 · PDF/DOCX/HWP · 최대 20MB"
            onFileDrop={selectFile}
          />
          <UploadNotice
            title="업로드 전 확인"
            description="주민등록번호·계좌번호 등 민감정보는 가린 뒤 업로드해 주세요."
          />
        </>
      );
    }

    if (!file) return null;

    if (step === 'uploading') {
      return (
        <>
          <UploadDropZone
            status="uploading"
            title="서류를 업로드하고 있습니다"
            description="창을 닫지 말고 잠시만 기다려 주세요."
            onFileDrop={selectFile}
          />
          <UploadFileRow
            fileName={file.name}
            extension={extension}
            meta={`업로드 ${progress}% · ${sizeLabel}`}
            status="uploading"
          />
          <UploadNotice
            title="업로드 진행 중"
            description="완료 후 파일 정보를 자동으로 확인합니다."
          />
        </>
      );
    }

    if (step === 'error') {
      const isInvalid = error === 'invalid';
      return (
        <>
          <UploadDropZone
            status="error"
            title="서류를 업로드하지 못했습니다"
            description={
              isInvalid
                ? '지원하지 않는 형식이거나 20MB를 넘는 파일이에요.'
                : '파일 상태와 네트워크 연결을 확인해 주세요.'
            }
            onFileDrop={selectFile}
          />
          <UploadFileRow
            fileName={file.name}
            extension={extension}
            meta={
              isInvalid
                ? `업로드 불가 · ${sizeLabel}`
                : '업로드 실패 · 선택한 파일은 유지됩니다.'
            }
            status="error"
            onRetry={isInvalid ? undefined : retry}
          />
          <UploadNotice
            tone="error"
            title="업로드 실패"
            description="20MB 이하의 지원 형식인지 확인한 뒤 다시 시도해 주세요."
          />
        </>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        <UploadFileRow
          fileName={file.name}
          extension={extension}
          meta={`업로드 완료 · ${sizeLabel}`}
          status="success"
        />
        <ApplicationHistorySectionHeader
          title="파일 정보"
          meta="자동 분석 결과"
        />
        <RowModalKeyValue
          label="서류 유형"
          value={getDocumentType(file.name)}
        />
        <RowModalKeyValue
          label="마지막 수정"
          value={convertDateToLabel(new Date(file.lastModified))}
        />
        <RowModalKeyValue
          label="파일 형식"
          value={`${extension.toUpperCase()} · ${sizeLabel}`}
        />
        <UploadNotice
          title="사용 전 확인"
          description="최신 경력과 연락처가 정확한지 한 번 더 확인해 주세요."
        />
      </div>
    );
  };

  const renderFooter = () => {
    if (step === 'select') {
      return (
        <>
          <ModalButton variant="secondary" onClick={handleClose}>
            취소
          </ModalButton>
          <ModalButton onClick={openFilePicker}>파일 선택</ModalButton>
        </>
      );
    }

    if (step === 'uploading') {
      return (
        <>
          <ModalButton variant="secondary" onClick={reset}>
            취소
          </ModalButton>
          <ModalButton aria-disabled="true">업로드 중</ModalButton>
        </>
      );
    }

    if (step === 'error') {
      return error === 'invalid' ? (
        <>
          <ModalButton variant="secondary" onClick={handleClose}>
            취소
          </ModalButton>
          <ModalButton onClick={handleSelectAnother}>
            다른 파일 선택
          </ModalButton>
        </>
      ) : (
        <>
          <ModalButton variant="secondary" onClick={handleSelectAnother}>
            다른 파일 선택
          </ModalButton>
          <ModalButton onClick={retry}>다시 시도</ModalButton>
        </>
      );
    }

    return (
      <>
        <ModalButton variant="secondary" onClick={handleSelectAnother}>
          다시 업로드
        </ModalButton>
        <ModalButton onClick={handleConfirm}>이 서류 사용</ModalButton>
      </>
    );
  };

  return (
    <Modal
      title={STEP_TITLES[step]}
      size="wide"
      isOpen={isOpen}
      hasCloseButton={!isUploading}
      canCloseOnBackdropClick={!isUploading}
      onClose={handleClose}
      footer={renderFooter()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={DOCUMENT_FILE_ACCEPT}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        onChange={handleFileChange}
      />
      {renderContent()}
    </Modal>
  );
};

export default DocumentUploadModal;
