import themeData from "@/styles/theme.json";
import { Root } from "@/types/theme.types";
import localFont from "next/font/local";
import { createGlobalStyle } from "styled-components";

const gamuliBoldFont = localFont({
  src: "../assets/fonts/Galmuri11-Bold.ttf",
});
const gamuli14Font = localFont({ src: "../assets/fonts/Galmuri14.ttf" });

const neoFont = localFont({
  src: "../assets/fonts/NeoDunggeunmoPro-Regular.ttf",
});

const styled = { createGlobalStyle };

export const theme: Root = themeData as Root;

const GlobalStyle = styled.createGlobalStyle`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  button,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    font-family: var(--main-font);
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  :root {
    --user-exists: #15e42a;
    --user-not-exists: #ff001f;
    --color-blue-50: #eff6ff;
    --color-blue-100: #dbeafe;
    --color-blue-200: #bfdbfe;
    --color-blue-300: #93c5fd;
    --color-blue-400: #60a5fa;
    --color-blue-500: #3b82f6;
    --color-blue-600: #2563eb;
    --color-blue-700: #1d4ed8;
    --color-blue-800: #1e40af;
    --color-blue-900: #172554;
    --color-red-50: #fef2f2;
    --color-red-100: #fee2e2;
    --color-red-200: #fecaca;
    --color-red-300: #fca5a5;
    --color-red-400: #f87171;
    --color-red-500: #ef4444;
    --color-red-600: #dc2626;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;
    --color-red-900: #450a0a;
    --color-green-50: #f0fdf4;
    --color-green-100: #dcfce7;
    --color-green-200: #bbf7d0;
    --color-green-300: #86efac;
    --color-green-400: #4ade80;
    --color-green-500: #22c55e;
    --color-green-600: #16a34a;
    --color-green-700: #15803d;
    --color-green-800: #166534;
    --color-green-900: #052e16;
    --color-yellow-50: #fefce8;
    --color-yellow-100: #fef9c3;
    --color-yellow-200: #fef08a;
    --color-yellow-300: #fde047;
    --color-yellow-400: #facc15;
    --color-yellow-500: #eab308;
    --color-yellow-600: #ca8a04;
    --color-yellow-700: #a16207;
    --color-yellow-800: #854d0e;
    --color-yellow-900: #713f12;
    --color-orange-50: #fff7ed;
    --color-orange-100: #ffedd5;
    --color-orange-200: #fed7aa;
    --color-orange-300: #fdba74;
    --color-orange-400: #fb923c;
    --color-orange-500: #f97316;
    --color-orange-600: #ea580c;
    --color-orange-700: #c2410c;
    --color-orange-800: #9a3412;
    --color-orange-900: #431407;
    --color-indigo-50: #eef2ff;
    --color-indigo-100: #e0e7ff;
    --color-indigo-200: #c7d2fe;
    --color-indigo-300: #a5b4fc;
    --color-indigo-400: #818cf8;
    --color-indigo-500: #6366f1;
    --color-indigo-600: #4f46e5;
    --color-indigo-700: #4338ca;
    --color-indigo-800: #3730a3;
    --color-indigo-900: #1e1b4b;
    --color-teal-50: #f0fdfa;
    --color-teal-100: #ccfbf1;
    --color-teal-200: #99f6e4;
    --color-teal-300: #5eead4;
    --color-teal-400: #2dd4bf;
    --color-teal-500: #14b8a6;
    --color-teal-600: #0d9488;
    --color-teal-700: #0f766e;
    --color-teal-800: #115e59;
    --color-teal-900: #042f2e;
    --color-grey-50: #f9fafb;
    --color-grey-100: #f3f4f6;
    --color-grey-200: #e5e7eb;
    --color-grey-300: #d1d5db;
    --color-grey-400: #9ca3af;
    --color-grey-500: #6b7280;
    --color-grey-600: #4b5563;
    --color-grey-700: #374151;
    --color-grey-800: #1f2937;
    --color-grey-900: #030712;
    --color-grey-sub-line: #dbdbdb;
    --color-base-black: #000000;
    --color-base-white: #ffffff;
    --size-0: 0rem;
    --size-1: 0.1rem;
    --size-2: 0.2rem;
    --size-4: 0.4rem;
    --size-6: 0.6rem;
    --size-8: 0.8rem;
    --size-12: 1.2rem;
    --size-13: 1.3rem;
    --size-14: 1.4rem;
    --size-15: 1.5rem;
    --size-16: 1.6rem;
    --size-19-5: 1.95rem;
    --size-20: 2rem;
    --size-24: 2.4rem;
    --size-32: 3.2rem;
    --size-36: 3.6rem;
    --size-40: 4rem;
    --size-44: 4.4rem;
    --size-48: 4.8rem;
    --size-56: 5.6rem;
    --size-64: 6.4rem;
    --size-80: 8rem;
    --size-96: 9.6rem;
    --size-112: 11.2rem;
    --size-118: 11.8rem;
    --size-128: 12.8rem;
    --size-130: 13rem;
    --size-412: 41.2rem;
    --size-181: 18.1rem;
    --size-220: 22rem;
    --size-460: 46rem;

    --unit-0: var(--size-0);
    --unit-2: var(--size-2);
    --unit-4: var(--size-4);
    --unit-6: var(--size-6);
    --unit-8: var(--size-8);
    --unit-12: var(--size-12);
    --unit-13: var(--size-13);
    --unit-14: var(--size-14);
    --unit-15: var(--size-15);
    --unit-16: var(--size-16);
    --unit-19-5: var(--size-19-5);
    --unit-20: var(--size-20);
    --unit-24: var(--size-24);
    --unit-32: var(--size-32);
    --unit-36: var(--size-36);
    --unit-40: var(--size-40);
    --unit-44: var(--size-44);
    --unit-48: var(--size-48);
    --unit-56: var(--size-56);
    --unit-64: var(--size-64);
    --unit-80: var(--size-80);
    --unit-96: var(--size-96);
    --unit-112: var(--size-112);
    --unit-118: var(--size-118);
    --unit-128: var(--size-128);
    --unit-130: var(--size-130);
    --unit-181: var(--size-181);
    --unit-220: var(--size-220);
    --unit-412: var(--size-412);
    --unit-460: var(--size-460);

    --spacing-0: var(--size-0);
    --spacing-2: var(--size-2);
    --spacing-4: var(--size-4);
    --spacing-6: var(--size-6);
    --spacing-8: var(--size-8);
    --spacing-12: var(--size-12);
    --spacing-13: var(--size-13);
    --spacing-14: var(--size-14);
    --spacing-15: var(--size-15);
    --spacing-16: var(--size-16);
    --spacing-19-5: var(--size-19-5);
    --spacing-20: var(--size-20);
    --spacing-24: var(--size-24);
    --spacing-32: var(--size-32);
    --spacing-36: var(--size-36);
    --spacing-40: var(--size-40);
    --spacing-44: var(--size-44);
    --spacing-48: var(--size-48);
    --spacing-56: var(--size-56);
    --spacing-64: var(--size-64);
    --spacing-80: var(--size-80);
    --spacing-96: var(--size-96);
    --spacing-112: var(--size-112);
    --spacing-118: var(--size-118);
    --spacing-128: var(--size-128);
    --spacing-130: var(--size-130);
    --spacing-181: var(--size-181);
    --spacing-220: var(--size-220);
    --spacing-412: var(--size-412);
    --spacing-460: var(--size-460);

    --color-brand-50: var(--color-blue-50);
    --color-brand-100: var(--color-blue-100);
    --color-brand-200: var(--color-blue-200);
    --color-brand-300: var(--color-blue-300);
    --color-brand-400: var(--color-blue-400);
    --color-brand-500: var(--color-blue-500);
    --color-brand-600: var(--color-blue-600);
    --color-brand-700: var(--color-blue-700);
    --color-brand-800: var(--color-blue-800);
    --color-brand-900: var(--color-blue-900);
    --color-info-50: var(--color-blue-50);
    --color-info-100: var(--color-blue-100);
    --color-info-200: var(--color-blue-200);
    --color-info-300: var(--color-blue-300);
    --color-info-400: var(--color-blue-400);
    --color-info-500: var(--color-blue-500);
    --color-info-600: var(--color-blue-600);
    --color-info-700: var(--color-blue-700);
    --color-info-800: var(--color-blue-800);
    --color-success-50: var(--color-green-50);
    --color-success-100: var(--color-green-100);
    --color-success-200: var(--color-green-200);
    --color-success-300: var(--color-green-300);
    --color-success-400: var(--color-green-400);
    --color-success-500: var(--color-green-500);
    --color-success-600: var(--color-green-600);
    --color-success-700: var(--color-green-700);
    --color-success-800: var(--color-green-800);
    --color-warning-50: var(--color-yellow-50);
    --color-warning-100: var(--color-yellow-100);
    --color-warning-200: var(--color-yellow-200);
    --color-warning-300: var(--color-yellow-300);
    --color-warning-400: var(--color-yellow-400);
    --color-warning-500: var(--color-yellow-500);
    --color-warning-600: var(--color-yellow-600);
    --color-warning-700: var(--color-yellow-700);
    --color-warning-800: var(--color-yellow-800);
    --color-danger-50: var(--color-red-50);
    --color-danger-100: var(--color-red-100);
    --color-danger-200: var(--color-red-200);
    --color-danger-300: var(--color-red-300);
    --color-danger-400: var(--color-red-400);
    --color-danger-500: var(--color-red-500);
    --color-danger-600: var(--color-red-600);
    --color-danger-700: var(--color-red-700);
    --color-danger-800: var(--color-red-800);
    --color-neutral-50: var(--color-grey-50);
    --color-neutral-100: var(--color-grey-100);
    --color-neutral-200: var(--color-grey-200);
    --color-neutral-300: var(--color-grey-300);
    --color-neutral-400: var(--color-grey-400);
    --color-neutral-500: var(--color-grey-500);
    --color-neutral-600: var(--color-grey-600);
    --color-neutral-700: var(--color-grey-700);
    --color-neutral-800: var(--color-grey-800);
    --color-neutral-900: var(--color-grey-900);
    --color-text-primary: var(--color-neutral-900);
    --color-text-secondary: var(--color-neutral-700);
    --color-text-tertiary: var(--color-neutral-600);
    --color-text-interactive-primary: var(--color-brand-600);
    --color-text-interactive-primary-hovered: var(--color-brand-700);
    --color-text-interactive-primary-pressed: var(--color-brand-800);
    --color-text-interactive-secondary: var(--color-neutral-600);
    --color-text-interactive-secondary-hovered: var(--color-neutral-700);
    --color-text-interactive-secondary-pressed: var(--color-neutral-800);
    --color-text-interactive-selected: var(--color-brand-600);
    --color-text-interactive-visited: var(--color-indigo-700);
    --color-text-interactive-inverse: var(--color-base-white);
    --color-text-info-bold: var(--color-info-800);
    --color-text-info: var(--color-info-600);
    --color-text-warning-bold: var(--color-warning-800);
    --color-text-warning: var(--color-warning-600);
    --color-text-success-bold: var(--color-success-800);
    --color-text-success: var(--color-success-600);
    --color-text-danger-bold: var(--color-danger-800);
    --color-text-danger: var(--color-danger-600);
    --color-text-disabled: var(--color-neutral-400);
    --color-bg-primary: var(--color-base-white);
    --color-bg-secondary: var(--color-neutral-50);
    --color-bg-tertiary: var(--color-neutral-100);
    --color-bg-brand: var(--color-brand-600);
    --color-bg-info-bold: var(--color-info-700);
    --color-bg-interactive-primary: var(--color-brand-600);
    --color-bg-interactive-primary-hovered: var(--color-brand-700);
    --color-bg-interactive-primary-pressed: var(--color-brand-800);
    --color-bg-interactive-secondary: var(--color-neutral-100);
    --color-bg-interactive-secondary-hovered: var(--color-neutral-200);
    --color-bg-interactive-scondary-pressed: var(--color-neutral-300);
    --color-bg-interactive-danger: var(--color-danger-600);
    --color-bg-interactive-danger-hovered: var(--color-danger-700);
    --color-bg-interactive-danger-pressed: var(--color-danger-800);
    --color-bg-interactive-selected: var(--color-brand-50);
    --color-bg-interactive-selected-hovered: var(--color-brand-100);
    --color-bg-interactive-selected-press: var(--color-brand-200);
    --color-bg-info-subtle: var(--color-info-50);
    --color-bg-warning-bold: var(--color-warning-500);
    --color-bg-warning-subtle: var(--color-warning-50);
    --color-bg-success-bold: var(--color-success-700);
    --color-bg-success-subtle: var(--color-success-50);
    --color-bg-danger-bold: var(--color-danger-700);
    --color-bg-danger-subtle: var(--color-danger-50);
    --color-bg-inverse-bold: var(--color-neutral-700);
    --color-bg-inverse-bolder: var(--color-neutral-800);
    --color-bg-disabled: var(--color-neutral-300);
    --color-bg-brand: var(--color-blue-600);
    --color-icon-primary: var(--color-neutral-800);
    --color-icon-brand: var(--color-brand-700);
    --color-icon-interactive-primary: var(--color-brand-600);
    --color-icon-interactive-primary-hovered: var(--color-brand-700);
    --color-icon-interactive-primary-pressed: var(--color-brand-800);
    --color-icon-interactive-secondary: var(--color-neutral-600);
    --color-icon-interactive-secondary-hovered: var(--color-neutral-700);
    --color-icon-interactive-secondary-press: var(--color-neutral-800);
    --color-icon-interactive-visited: var(--color-indigo-700);
    --color-icon-interactive-inverse: var(--color-base-white);
    --color-icon-info: var(--color-info-700);
    --color-icon-warning: var(--color-warning-700);
    --color-icon-success: var(--color-success-700);
    --color-icon-danger: var(--color-danger-700);
    --color-icon-disabled: var(--color-neutral-400);
    --color-border-primary: var(--color-neutral-400);
    --color-border-secondary: var(--color-neutral-200);
    --color-border-interactive-primary: var(--color-brand-600);
    --color-border-interactive-primary-hovered: var(--color-brand-700);
    --color-border-interactive-primary-pressed: var(--color-brand-800);
    --color-border-focusRing: var(--color-brand-600);
    --color-border-info: var(--color-info-600);
    --color-border-info-subtle: var(--color-info-100);
    --color-border-warning: var(--color-warning-500);
    --color-border-warning-subtle: var(--color-warning-100);
    --color-border-success: var(--color-success-600);
    --color-border-success-subtle: var(--color-success-50);
    --color-border-danger: var(--color-danger-600);
    --color-border-danger-subtle: var(--color-danger-100);
    --color-border-disabled: var(--color-neutral-400);
    --color-border-sub-line: var(--color-grey-sub-line);

    --border-radius-0: var(--size-0);
    --border-radius-2: var(--size-2);
    --border-radius-4: var(--size-4);
    --border-radius-8: var(--size-8);
    --border-radius-12: var(--size-12);
    --border-radius-16: var(--size-16);
    --border-radius-36: var(--size-36);
    --border-radius-circle: "9999px";
    --color-border-interactive-secondary: var(--color-neutral-600);
    --color-border-interactive-secondary-hovered: var(--color-neutral-700);
    --color-border-interactive-secondary-pressed: var(--color-neutral-800);

    --main-font: ${gamuli14Font.style.fontFamily};
    --point-font: ${gamuliBoldFont.style.fontFamily};
    --sub-font: ${neoFont.style.fontFamily};

    --button-opacity: rgba(0, 0, 0, 0.5);
    --default-font: sans-serif;

    --state-online: #15e42a;
    --state-eating: #ffa047;
    --state-left-seat: #858585;
    --state-disturb: #ee3e3e;

    --video-width: 175px;
    --video-height: 130px;
  }

  * {
    box-sizing: border-box;
  }

  Html {
    font-size: 62.5%;
  }

  body {
    margin: unset;
    min-width: 100%;
  }

  header {
    max-width: 100vw;
    margin: 0 auto;
  }
  main > section {
    max-width: 1280px;
    margin: 0 auto;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.color.text.primary};
  }

  input {
    height: ${(props) => props.theme.unit[48]};
    border-radius: ${(props) => props.theme.border.radius[8]};
    border: 1px solid ${(props) => props.theme.color.border.secondary};
    padding: ${(props) => props.theme.spacing[16]};
    padding: ${(props) => props.theme.spacing[16]};
  }

  textarea {
    width: 100%;
    resize: none;
    height: ${(props) => props.theme.unit[64]};
    padding: ${(props) => props.theme.spacing[12]};
    border-radius: ${(props) => props.theme.border.radius[8]};
    border: 1px solid ${(props) => props.theme.color.border.secondary};
    font-family: var(--main-font);
    font-size: ${(props) => props.theme.body.md.medium.fontSize};
    &:focus {
      outline: none;
      border: 1px solid
        ${(props) => props.theme.color.border.interactive.primary};
    }
  }

  button {
    display: inline-block;
    padding-top: ${(props) => props.theme.spacing[8]};
    padding-bottom: ${(props) => props.theme.spacing[8]};
    padding-left: ${(props) => props.theme.spacing[24]};
    padding-right: ${(props) => props.theme.spacing[24]};
    border: 1px solid
      ${(props) => props.theme.color.border.interactive.secondary};
    border-radius: ${(props) => props.theme.border.radius[8]};
    color: ${(props) =>
      props.theme.color.text.interactive["secondary-pressed"]};
    background-color: ${(props) => props.theme.color.base.white};
    font-family: var(--sub-font);
    font-weight: ${(props) => props.theme.body.lg.semibold.fontWeight};
    cursor: pointer;

    &:hover {
      background-color: ${(props) =>
        props.theme.color.bg.interactive["primary-hovered"]};
      color: ${(props) => props.theme.color.base.white};
    }
  }
  #__next {
    height: 100vh;
  }
`;

export default GlobalStyle;
