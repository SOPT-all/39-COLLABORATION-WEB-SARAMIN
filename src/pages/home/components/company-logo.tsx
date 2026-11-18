import LogoDanggeun from '@/shared/assets/logo/logo_danggeun.svg';
import LogoHyundaiAutoever from '@/shared/assets/logo/logo_hyundai_autoever.svg';
import LogoKakaopay from '@/shared/assets/logo/logo_kakaopay.svg';
import LogoMusinsa from '@/shared/assets/logo/logo_musinsa.svg';
import LogoNaverCloud from '@/shared/assets/logo/logo_naver_cloud.svg';
import LogoOliveYoung from '@/shared/assets/logo/logo_olive_young.svg';
import LogoTodaysHome from '@/shared/assets/logo/logo_todays_home.svg';
import LogoToss from '@/shared/assets/logo/logo_toss.svg';

// 로고 에셋이 있는 기업이에요. 서버 회사명 표기 그대로 찾아요.
const COMPANY_LOGOS: Record<string, string> = {
  카카오페이: LogoKakaopay,
  무신사: LogoMusinsa,
  '오늘의 집': LogoTodaysHome,
  네이버클라우드: LogoNaverCloud,
  당근: LogoDanggeun,
  토스: LogoToss,
  현대오토에버: LogoHyundaiAutoever,
  올리브영: LogoOliveYoung,
};

interface CompanyLogoProps {
  companyName: string;
}

// 로고 에셋이 없는 기업은 회사명 첫 글자로 보여 줘요.
const CompanyLogo = ({ companyName }: CompanyLogoProps) => {
  const logoSrc = COMPANY_LOGOS[companyName];

  if (logoSrc) {
    return <img src={logoSrc} alt="" className="size-8 rounded-lg" />;
  }

  return (
    <span
      aria-hidden
      className="flex size-8 items-center justify-center rounded-lg bg-surface-subtle text-label-12 text-text-secondary"
    >
      {companyName.charAt(0)}
    </span>
  );
};

export default CompanyLogo;
