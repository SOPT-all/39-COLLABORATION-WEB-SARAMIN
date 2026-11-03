import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// 커스텀 글자 크기 토큰(text-body-16 등)을 색상 클래스로 오인해 지우지 않도록 등록해요.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'display-64',
        'display-48',
        'display-40',
        'display-32',
        'heading-28',
        'heading-24',
        'heading-20',
        'heading-18',
        'title-16',
        'title-14',
        'body-20',
        'body-18',
        'body-16',
        'body-14',
        'body-12',
        'label-16',
        'label-14',
        'label-12',
        'caption-12',
        'caption-11',
      ],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
