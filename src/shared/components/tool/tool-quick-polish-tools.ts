// [스펙] 취업 준비 도구 표
// 역할   : 도구 9종마다 아이콘과 라벨을 모아 둠. 컴포넌트는 이 표를 읽기만 함
// 라벨   : 피그마처럼 두 줄로 고정 ("글자수 / 세기"). 줄바꿈은 \n
// 아이콘 : 디자인팀이 SVG로 교체한 ic_quick_polish_* 9종. 회색 선 + 파란 포인트 2색이라 currentColor 안 씀
// 순서   : 피그마 순서 그대로. 홈 도구 섹션(#51)에서 이 순서로 9개를 늘어놓음

import type { ComponentType, SVGProps } from 'react';

import IcAnnualLeaveCalculator from '@/shared/assets/icons/ic-quick-polish-annual-leave-calculator.svg?react';
import IcGradeConverter from '@/shared/assets/icons/ic-quick-polish-grade-converter.svg?react';
import IcGraduationYearCalculator from '@/shared/assets/icons/ic-quick-polish-graduation-year-calculator.svg?react';
import IcImageResize from '@/shared/assets/icons/ic-quick-polish-image-resize.svg?react';
import IcResumeCheck from '@/shared/assets/icons/ic-quick-polish-resume-check.svg?react';
import IcSalaryCalculator from '@/shared/assets/icons/ic-quick-polish-salary-calculator.svg?react';
import IcSeveranceCalculator from '@/shared/assets/icons/ic-quick-polish-severance-calculator.svg?react';
import IcTextCount from '@/shared/assets/icons/ic-quick-polish-text-count.svg?react';
import IcUnemploymentCalculator from '@/shared/assets/icons/ic-quick-polish-unemployment-calculator.svg?react';

export type ToolQuickPolishKey =
  | 'textCount'
  | 'resumeCheck'
  | 'imageResize'
  | 'salaryCalculator'
  | 'severanceCalculator'
  | 'unemploymentCalculator'
  | 'annualLeaveCalculator'
  | 'graduationYearCalculator'
  | 'gradeConverter';

export interface ToolQuickPolishItem {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}

export const TOOL_QUICK_POLISH_ITEMS: Record<
  ToolQuickPolishKey,
  ToolQuickPolishItem
> = {
  textCount: { icon: IcTextCount, label: '글자수\n세기' },
  resumeCheck: { icon: IcResumeCheck, label: '자소서\n진단' },
  imageResize: { icon: IcImageResize, label: '사진크기\n조정' },
  salaryCalculator: { icon: IcSalaryCalculator, label: '연봉\n계산기' },
  severanceCalculator: { icon: IcSeveranceCalculator, label: '퇴직금\n계산기' },
  unemploymentCalculator: {
    icon: IcUnemploymentCalculator,
    label: '실업급여\n계산기',
  },
  annualLeaveCalculator: {
    icon: IcAnnualLeaveCalculator,
    label: '연차\n계산기',
  },
  graduationYearCalculator: {
    icon: IcGraduationYearCalculator,
    label: '졸업연도\n계산기',
  },
  gradeConverter: { icon: IcGradeConverter, label: '학점\n변환기' },
};

export const TOOL_QUICK_POLISH_KEYS = Object.keys(
  TOOL_QUICK_POLISH_ITEMS,
) as ToolQuickPolishKey[];
