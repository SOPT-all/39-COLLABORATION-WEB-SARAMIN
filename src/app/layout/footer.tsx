import { Fragment } from 'react';

import imgEmploymentService from '@/shared/assets/images/img-employment-service.png';
import imgFooterSprite from '@/shared/assets/images/img-footer-sprite.png';
import imgIsmsP from '@/shared/assets/images/img-isms-p.png';
import logoSaraminFooter from '@/shared/assets/logo/logo-saramin-footer.png';

const FOOTER_LINKS = [
  { label: '회사소개' },
  { label: '인재채용' },
  { label: '이용약관' },
  { label: '개인정보 처리방침', isBold: true },
  { label: '위치기반서비스 이용약관', isBold: true },
  { label: '채용정보 API' },
  { label: '제휴문의' },
  { label: '고객센터' },
];

const COMPANY_INFOS = [
  '(주)사람인, 대표: 황현순',
  '서울특별시 강서구 공항대로 165, 원그로브 C동 11층 (마곡동, 원그로브)',
  '사업자등록: 113-86-00917 / 직업정보제공사업: 서울 관악 제 2005-6호 / 통신판매업: 제 2025-서울강서-0847호',
  '이메일: help@saramin.co.kr / 사람인 고객센터 02-6226-5000 (평일 09:00~19:00, 주말·공휴일 휴무)',
  'Fax: 02-6937-0039(대표), 02-6937-0035(세금계산서)',
];

// img-footer-sprite.png 한 장에 SNS 아이콘 4개와 화살표가 가로로 들어 있어요. (1배 기준 144 × 24)
const SPRITE_SIZE = '144px 24px';

const SNS_LINKS = [
  { label: '인스타그램', offsetX: 0 },
  { label: '블로그', offsetX: -32 },
  { label: '페이스북', offsetX: -64 },
  { label: '유튜브', offsetX: -96 },
];

const CERTIFICATIONS = [
  {
    image: imgIsmsP,
    imageAlt: '정보보호 및 개인정보보호 관리체계(ISMS-P)',
    imageClassName: 'h-7.5 w-10.5',
    lines: [
      '[인증범위] 사람인 취업·매칭 서비스 운영',
      '[유효기간] 2025.11.05 ~ 2028.11.04',
    ],
  },
  {
    image: imgEmploymentService,
    imageAlt: '민간고용서비스 우수기관 인증',
    imageClassName: 'size-8.5',
    lines: [
      '[인증유형] 고용서비스 우수기관(직업정보제공사업)',
      '[유효기간] 2025.01.01 ~ 2027.12.31',
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-gray-40 bg-surface-default">
      <div className="mx-auto flex w-315 gap-14 pt-10">
        <img
          src={logoSaraminFooter}
          alt="사람인"
          width={100}
          height={25}
          className="h-6.25 w-25 shrink-0"
        />

        <div className="flex w-276 flex-col">
          <ul className="flex items-center gap-6">
            {FOOTER_LINKS.map(({ label, isBold }, index) => (
              <Fragment key={label}>
                {index > 0 && (
                  <li aria-hidden className="h-3 w-px bg-gray-30" />
                )}
                <li>
                  <a
                    href="#"
                    className={
                      isBold
                        ? 'text-title-14 text-gray-100'
                        : 'text-body-14 text-gray-100'
                    }
                  >
                    {label}
                  </a>
                </li>
              </Fragment>
            ))}
          </ul>

          <address className="flex flex-col gap-0.5 pt-3 text-body-12 text-gray-80 not-italic">
            {COMPANY_INFOS.map((info) => (
              <p key={info}>{info}</p>
            ))}
          </address>
          <p className="pt-2 text-body-12 text-gray-80">
            ㈜사람인이 직접 판매하는 상품의 경우 판매자로서 책임을 부담합니다.
            다만, 입점 판매자가 등록한 상품의 경우 ㈜사람인은 통신판매중개자로서
            통신판매의 당사자가 아니며, 상품 정보 및 거래에 관한 책임은 해당
            판매자에게 있습니다.
          </p>

          <div className="mt-3 flex items-center justify-between border-t border-gray-30 pt-3">
            <div className="flex items-center gap-1">
              <a
                href="#"
                className="flex h-6.5 items-center rounded-md border border-gray-30 bg-surface-default px-2 text-label-14 text-gray-110"
              >
                이메일 문의
              </a>
              <button
                type="button"
                className="flex h-6 items-center rounded-md border border-gray-30 bg-surface-default px-2 text-label-14 text-gray-110"
              >
                사업자정보확인
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex h-6 items-center gap-1 px-1 text-label-14 text-gray-80"
              >
                모바일 버전 보기
                <span
                  aria-hidden
                  className="size-4"
                  style={{
                    backgroundImage: `url(${imgFooterSprite})`,
                    backgroundSize: SPRITE_SIZE,
                    backgroundPosition: '-128px -4px',
                  }}
                />
              </button>
              <ul className="flex items-center gap-2">
                {SNS_LINKS.map(({ label, offsetX }) => (
                  <li key={label}>
                    <a
                      href="#"
                      aria-label={label}
                      className="block size-6"
                      style={{
                        backgroundImage: `url(${imgFooterSprite})`,
                        backgroundSize: SPRITE_SIZE,
                        backgroundPosition: `${offsetX}px 0`,
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="pt-2 text-body-12 text-gray-80">
            Copyright © (주)사람인. All rights reserved.
          </p>
        </div>
      </div>

      <div className="mt-5 flex h-14.5 justify-center gap-6 bg-surface-subtle py-3">
        {CERTIFICATIONS.map(({ image, imageAlt, imageClassName, lines }) => (
          <div key={imageAlt} className="flex items-center gap-2">
            <img src={image} alt={imageAlt} className={imageClassName} />
            <div className="flex min-w-82.5 flex-col text-body-12 leading-4 text-gray-90">
              {lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
