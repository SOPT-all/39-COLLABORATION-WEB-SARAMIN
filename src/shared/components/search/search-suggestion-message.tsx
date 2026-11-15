import type { ReactNode } from 'react';

import ActionButton from '@/shared/components/button/action-button';

interface SearchSuggestionMessageProps {
  title: string;
  description: string;
  actionLabel: string;
  icon: ReactNode;
  onAction?: () => void;
}

// TODO: state_message가 공통 컴포넌트로 생기면 이 부분을 그걸로 교체해야 함
const SearchSuggestionMessage = ({
  title,
  description,
  actionLabel,
  icon,
  onAction,
}: SearchSuggestionMessageProps) => {
  return (
    <div className="flex h-18 w-full items-center gap-3 rounded-lg border border-border-default p-3">
      {icon}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="truncate text-title-14 text-text-primary">{title}</p>
        <p className="truncate text-body-12 text-text-secondary">
          {description}
        </p>
      </div>
      <ActionButton onClick={onAction}>{actionLabel}</ActionButton>
    </div>
  );
};

export default SearchSuggestionMessage;
