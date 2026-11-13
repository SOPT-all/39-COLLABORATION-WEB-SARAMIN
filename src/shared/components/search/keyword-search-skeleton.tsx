import { cn } from '@/shared/utils/cn';

const SKELETON_CHIP_ROWS = [
  ['w-18', 'w-24'],
  ['w-22', 'w-16'],
  ['w-18', 'w-24'],
  ['w-22', 'w-16'],
] as const;

const KeywordSearchSkeleton = () => {
  return (
    <>
      <span aria-hidden className="h-4 w-22 rounded-md bg-surface-subtle" />
      <span aria-hidden className="h-2.5 w-42 rounded-md bg-surface-subtle" />
      <span aria-hidden className="h-10 w-full rounded-lg bg-surface-subtle" />
      {SKELETON_CHIP_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((width, widthIndex) => (
            <span
              key={widthIndex}
              aria-hidden
              className={cn('h-7 rounded-lg bg-surface-subtle', width)}
            />
          ))}
        </div>
      ))}
      <span className="flex-1" />
      <span aria-hidden className="h-11 w-full rounded-lg bg-surface-subtle" />
    </>
  );
};

export default KeywordSearchSkeleton;
