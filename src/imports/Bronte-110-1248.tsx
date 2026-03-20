import svgPaths from "./svg-2gig7i52ia";

function Container() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#323232] text-[20px] tracking-[0.32px] w-[85px]">
          <p className="leading-[normal]">Recent</p>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="absolute content-stretch flex gap-[265px] items-center left-0 pb-[8px] pt-[4px] px-[16px] top-[46px] w-[393px]" data-name="logo">
      <Container />
    </div>
  );
}

function SortIcon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Sort Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Sort Icon">
          <path d={svgPaths.p14bf5b00} fill="var(--fill-0, #323232)" id="Vector" stroke="var(--stroke-1, #323232)" strokeLinejoin="round" strokeWidth="0.428571" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#323232] text-[13px] tracking-[0.13px] whitespace-nowrap">Last Modified</p>
      <SortIcon />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M2.5 10H2.5075" id="Vector" stroke="var(--stroke-0, #323232)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2.5 15H2.5075" id="Vector_2" stroke="var(--stroke-0, #323232)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2.5 5H2.5075" id="Vector_3" stroke="var(--stroke-0, #323232)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" />
          <path d="M6.66667 10H17.5" id="Vector_4" stroke="var(--stroke-0, #323232)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" />
          <path d="M6.66667 15H17.5" id="Vector_5" stroke="var(--stroke-0, #323232)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" />
          <path d="M6.66667 5H17.5" id="Vector_6" stroke="var(--stroke-0, #323232)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8.5px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <Button />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0" data-name="Container">
      <Container3 />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header Cell">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] relative w-full">
          <Frame />
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2d4ea800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BaseIcon() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="BaseIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start not-italic overflow-clip relative rounded-[inherit] w-full whitespace-nowrap">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] min-w-full overflow-hidden relative shrink-0 text-[#323232] text-[14px] text-ellipsis w-[min-content]">
          <p className="leading-[20px] overflow-hidden">Political Economy of Institutions and Development</p>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#999] text-[10px]">Karen White | 6 Members</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p39a1e780} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p3986d480} id="Vector_2" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p2b624e00} id="Vector_3" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-center justify-center relative size-full">
        <Button1 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <BaseIcon />
        <Paragraph />
        <Container7 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-center relative w-full">
        <Container6 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[72px] relative shrink-0 w-[361px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[4px] py-[20px] relative size-full">
        <Container5 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2d4ea800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BaseIcon1() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="BaseIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start not-italic overflow-clip relative rounded-[inherit] w-full whitespace-nowrap">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] min-w-full overflow-hidden relative shrink-0 text-[#323232] text-[14px] text-ellipsis w-[min-content]">
          <p className="leading-[20px] overflow-hidden">Political Economy of Institutions and Development</p>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#999] text-[10px]">Karen White | 6 Members</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p39a1e780} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p3986d480} id="Vector_2" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p2b624e00} id="Vector_3" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[44px] relative rounded-[33554400px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center px-[12px] relative">
        <Icon4 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-center justify-center relative size-full">
        <Button2 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <BaseIcon1 />
        <Paragraph1 />
        <Container11 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-center relative w-full">
        <Container10 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[72px] relative shrink-0 w-[361px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[4px] py-[20px] relative size-full">
        <Container9 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2d4ea800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BaseIcon2() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="BaseIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start not-italic overflow-clip relative rounded-[inherit] w-full whitespace-nowrap">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] min-w-full overflow-hidden relative shrink-0 text-[#323232] text-[14px] text-ellipsis w-[min-content]">
          <p className="leading-[20px] overflow-hidden">Political Economy of Institutions and Development</p>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#999] text-[10px]">Karen White | 6 Members</p>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p39a1e780} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p3986d480} id="Vector_2" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p2b624e00} id="Vector_3" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[44px] relative rounded-[33554400px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center px-[12px] relative">
        <Icon6 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-center justify-center relative size-full">
        <Button3 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <BaseIcon2 />
        <Paragraph2 />
        <Container15 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-center relative w-full">
        <Container14 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[72px] relative shrink-0 w-[361px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[4px] py-[20px] relative size-full">
        <Container13 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2d4ea800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BaseIcon3() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="BaseIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start not-italic overflow-clip relative rounded-[inherit] w-full whitespace-nowrap">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] min-w-full overflow-hidden relative shrink-0 text-[#323232] text-[14px] text-ellipsis w-[min-content]">
          <p className="leading-[20px] overflow-hidden">Political Economy of Institutions and Development</p>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#999] text-[10px]">Karen White | 6 Members</p>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p39a1e780} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p3986d480} id="Vector_2" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p2b624e00} id="Vector_3" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[44px] relative rounded-[33554400px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center px-[12px] relative">
        <Icon8 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-center justify-center relative size-full">
        <Button4 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <BaseIcon3 />
        <Paragraph3 />
        <Container19 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-center relative w-full">
        <Container18 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[72px] relative shrink-0 w-[361px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[4px] py-[20px] relative size-full">
        <Container17 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2d4ea800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BaseIcon4() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="BaseIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start not-italic overflow-clip relative rounded-[inherit] w-full whitespace-nowrap">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] min-w-full overflow-hidden relative shrink-0 text-[#323232] text-[14px] text-ellipsis w-[min-content]">
          <p className="leading-[20px] overflow-hidden">Political Economy of Institutions and Development</p>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#999] text-[10px]">Karen White | 6 Members</p>
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p39a1e780} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p3986d480} id="Vector_2" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p2b624e00} id="Vector_3" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[44px] relative rounded-[33554400px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center px-[12px] relative">
        <Icon10 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-center justify-center relative size-full">
        <Button5 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <BaseIcon4 />
        <Paragraph4 />
        <Container23 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-center relative w-full">
        <Container22 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[72px] relative shrink-0 w-[361px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[4px] py-[20px] relative size-full">
        <Container21 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2d4ea800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BaseIcon5() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="BaseIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start not-italic overflow-clip relative rounded-[inherit] w-full whitespace-nowrap">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] min-w-full overflow-hidden relative shrink-0 text-[#323232] text-[14px] text-ellipsis w-[min-content]">
          <p className="leading-[20px] overflow-hidden">Political Economy of Institutions and Development</p>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#999] text-[10px]">Karen White | 6 Members</p>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p39a1e780} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p3986d480} id="Vector_2" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p2b624e00} id="Vector_3" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[44px] relative rounded-[33554400px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center px-[12px] relative">
        <Icon12 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-center justify-center relative size-full">
        <Button6 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <BaseIcon5 />
        <Paragraph5 />
        <Container27 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-center relative w-full">
        <Container26 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[72px] relative shrink-0 w-[361px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[4px] py-[20px] relative size-full">
        <Container25 />
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2d4ea800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BaseIcon6() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="BaseIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <Icon13 />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start not-italic overflow-clip relative rounded-[inherit] w-full whitespace-nowrap">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] min-w-full overflow-hidden relative shrink-0 text-[#323232] text-[14px] text-ellipsis w-[min-content]">
          <p className="leading-[20px] overflow-hidden">Political Economy of Institutions and Development</p>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#999] text-[10px]">Karen White | 6 Members</p>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p39a1e780} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p3986d480} id="Vector_2" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p2b624e00} id="Vector_3" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[44px] relative rounded-[33554400px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center px-[12px] relative">
        <Icon14 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-center justify-center relative size-full">
        <Button7 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <BaseIcon6 />
        <Paragraph6 />
        <Container31 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-center relative w-full">
        <Container30 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[72px] relative shrink-0 w-[361px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[4px] py-[20px] relative size-full">
        <Container29 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2d4ea800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BaseIcon7() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="BaseIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <Icon15 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start not-italic overflow-clip relative rounded-[inherit] w-full whitespace-nowrap">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] min-w-full overflow-hidden relative shrink-0 text-[#323232] text-[14px] text-ellipsis w-[min-content]">
          <p className="leading-[20px] overflow-hidden">Political Economy of Institutions and Development</p>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#999] text-[10px]">Karen White | 6 Members</p>
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p39a1e780} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p3986d480} id="Vector_2" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p2b624e00} id="Vector_3" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[44px] relative rounded-[33554400px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center px-[12px] relative">
        <Icon16 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-center justify-center relative size-full">
        <Button8 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <BaseIcon7 />
        <Paragraph7 />
        <Container35 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-center relative w-full">
        <Container34 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[72px] relative shrink-0 w-[361px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[4px] py-[20px] relative size-full">
        <Container33 />
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2d4ea800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BaseIcon8() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="BaseIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <Icon17 />
      </div>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start not-italic overflow-clip relative rounded-[inherit] w-full whitespace-nowrap">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] min-w-full overflow-hidden relative shrink-0 text-[#323232] text-[14px] text-ellipsis w-[min-content]">
          <p className="leading-[20px] overflow-hidden">Political Economy of Institutions and Development</p>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#999] text-[10px]">Karen White | 6 Members</p>
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p39a1e780} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p3986d480} id="Vector_2" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p2b624e00} id="Vector_3" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[44px] relative rounded-[33554400px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center px-[12px] relative">
        <Icon18 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-center justify-center relative size-full">
        <Button9 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <BaseIcon8 />
        <Paragraph8 />
        <Container39 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-center relative w-full">
        <Container38 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[72px] relative shrink-0 w-[361px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[4px] py-[20px] relative size-full">
        <Container37 />
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2d4ea800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BaseIcon9() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="BaseIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <Icon19 />
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start not-italic overflow-clip relative rounded-[inherit] w-full whitespace-nowrap">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] min-w-full overflow-hidden relative shrink-0 text-[#323232] text-[14px] text-ellipsis w-[min-content]">
          <p className="leading-[20px] overflow-hidden">Political Economy of Institutions and Development</p>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#999] text-[10px]">Karen White</p>
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p39a1e780} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p3986d480} id="Vector_2" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p2b624e00} id="Vector_3" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[44px] relative rounded-[33554400px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center px-[12px] relative">
        <Icon20 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-center justify-center relative size-full">
        <Button10 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <BaseIcon9 />
        <Paragraph9 />
        <Container43 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-center relative w-full">
        <Container42 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[72px] relative shrink-0 w-[361px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[4px] py-[20px] relative size-full">
        <Container41 />
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2d4ea800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BaseIcon10() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="BaseIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <Icon21 />
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start not-italic overflow-clip relative rounded-[inherit] w-full whitespace-nowrap">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] min-w-full overflow-hidden relative shrink-0 text-[#323232] text-[14px] text-ellipsis w-[min-content]">
          <p className="leading-[20px] overflow-hidden">Political Economy of Institutions and Development</p>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#999] text-[10px]">Karen White</p>
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p39a1e780} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p3986d480} id="Vector_2" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p2b624e00} id="Vector_3" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[44px] relative rounded-[33554400px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center px-[12px] relative">
        <Icon22 />
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-center justify-center relative size-full">
        <Button11 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <BaseIcon10 />
        <Paragraph10 />
        <Container47 />
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-center relative w-full">
        <Container46 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[72px] relative shrink-0 w-[361px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[4px] py-[20px] relative size-full">
        <Container45 />
      </div>
    </div>
  );
}

function MobileCardView() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full" data-name="MobileCardView">
      <div className="content-stretch flex flex-col items-start px-[16px] relative w-full">
        <Container4 />
        <Container8 />
        <Container12 />
        <Container16 />
        <Container20 />
        <Container24 />
        <Container28 />
        <Container32 />
        <Container36 />
        <Container40 />
        <Container44 />
      </div>
    </div>
  );
}

function DataTable() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[393px]" data-name="DataTable">
      <HeaderCell />
      <MobileCardView />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <DataTable />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[393px]">
      <Frame3 />
    </div>
  );
}

function AdminPage() {
  return (
    <div className="h-[678px] relative shrink-0" data-name="AdminPage">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center overflow-clip relative rounded-[inherit]">
        <Frame1 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-[#fbfaf9] content-stretch flex flex-col h-[682px] items-start left-0 overflow-clip top-[90px] w-[393px]" data-name="Container">
      <AdminPage />
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p5358000} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p97ae280} id="Vector_2" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-center justify-center mix-blend-multiply overflow-clip px-[12px] relative rounded-[12px] shrink-0" data-name="Container">
      <Icon23 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#323232] text-[10px] whitespace-nowrap">Recent</p>
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pde72270} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-center justify-center mix-blend-multiply overflow-clip px-[12px] relative rounded-[12px] shrink-0" data-name="Container">
      <Icon24 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#525a70] text-[10px] whitespace-nowrap">Favorites</p>
    </div>
  );
}

function UserRoundPlus() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="user-round-plus 1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="user-round-plus 1">
          <path d={svgPaths.p39569680} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p5c9a200} id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M19 16V22" id="Vector_3" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 19H16" id="Vector_4" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-center justify-center mix-blend-multiply overflow-clip px-[12px] relative rounded-[12px] shrink-0" data-name="Container">
      <UserRoundPlus />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#525a70] text-[10px] whitespace-nowrap">Shared</p>
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3f3d8e00} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-center justify-center mix-blend-multiply overflow-clip px-[12px] relative rounded-[8px] shrink-0" data-name="Container">
      <Icon25 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#525a70] text-[10px] whitespace-nowrap">Admin</p>
    </div>
  );
}

function Box() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="box 1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="box 1">
          <path d={svgPaths.p28c58f80} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M3.3 7L12 12L20.7 7" id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 22V12" id="Vector_3" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-center justify-center mix-blend-multiply overflow-clip px-[12px] relative rounded-[12px] shrink-0" data-name="Container">
      <Box />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#525a70] text-[10px] whitespace-nowrap">Workspaces</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="flex-[1_0_0] h-[55px] min-h-px min-w-px relative">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container48 />
        <Container49 />
        <Container50 />
        <Container51 />
        <Container52 />
      </div>
    </div>
  );
}

function Logo1() {
  return (
    <div className="absolute bg-[#fbfaf9] content-stretch flex items-center justify-between left-0 pb-[12px] pt-[5px] px-[16px] top-[772px] w-[393px]" data-name="logo">
      <div aria-hidden="true" className="absolute border-[#cecece] border-solid border-t inset-0 pointer-events-none" />
      <Frame2 />
    </div>
  );
}

function Battery() {
  return (
    <div className="absolute h-[8.384px] left-[2.1px] top-[3.14px] w-[8.857px]" data-name="Battery">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.85653 8.384">
        <g id="Battery">
          <path d={svgPaths.p8497a80} fill="var(--fill-0, #34C759)" id="50" />
        </g>
      </svg>
    </div>
  );
}

function StatusIcons() {
  return (
    <div className="absolute content-stretch flex gap-[4.192px] items-center right-[14.67px] top-[16.77px]" data-name="Status Icons">
      <div className="h-[14.672px] relative shrink-0 w-[20.96px]" data-name="Network Signal / Light">
        <div className="absolute inset-[28.57%_30%_14.29%_55%]" data-name="Path">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.144 8.384">
            <path clipRule="evenodd" d={svgPaths.p1a2bb300} fill="var(--fill-0, #D1D1D6)" fillRule="evenodd" id="Path" />
          </svg>
        </div>
        <div className="absolute inset-[42.86%_52.5%_14.29%_32.5%]" data-name="Path">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.144 6.288">
            <path clipRule="evenodd" d={svgPaths.p16306900} fill="var(--fill-0, #D1D1D6)" fillRule="evenodd" id="Path" />
          </svg>
        </div>
        <div className="absolute bottom-[14.29%] left-[10%] right-3/4 top-[53.57%]" data-name="Path">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.144 4.716">
            <path clipRule="evenodd" d={svgPaths.p24bddc00} fill="var(--fill-0, #D1D1D6)" fillRule="evenodd" id="Path" />
          </svg>
        </div>
        <div className="absolute inset-[14.29%_7.5%_14.29%_77.5%]" data-name="Empty Bar">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.144 10.48">
            <path clipRule="evenodd" d={svgPaths.pe74b280} fill="var(--fill-0, #3C3C43)" fillOpacity="0.18" fillRule="evenodd" id="Empty Bar" />
          </svg>
        </div>
        <div className="absolute inset-[28.57%_30%_14.29%_55%]" data-name="Path">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.144 8.384">
            <path clipRule="evenodd" d={svgPaths.p1a2bb300} fill="var(--fill-0, black)" fillRule="evenodd" id="Path" />
          </svg>
        </div>
        <div className="absolute inset-[42.86%_52.5%_14.29%_32.5%]" data-name="Path">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.144 6.288">
            <path clipRule="evenodd" d={svgPaths.p16306900} fill="var(--fill-0, black)" fillRule="evenodd" id="Path" />
          </svg>
        </div>
        <div className="absolute bottom-[14.29%] left-[10%] right-3/4 top-[53.57%]" data-name="Path">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.144 4.716">
            <path clipRule="evenodd" d={svgPaths.p24bddc00} fill="var(--fill-0, black)" fillRule="evenodd" id="Path" />
          </svg>
        </div>
      </div>
      <div className="h-[14.672px] relative shrink-0 w-[16.768px]" data-name="WiFi Signal / Light">
        <div className="absolute inset-[63.85%_35.56%_14.29%_37.11%]" data-name="Path">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.58171 3.20731">
            <path d={svgPaths.p16adf900} fill="var(--fill-0, black)" id="Path" />
          </svg>
        </div>
        <div className="absolute inset-[39.07%_20.1%_37.26%_21.66%]" data-name="Path">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.76715 3.47334">
            <path d={svgPaths.p36080000} fill="var(--fill-0, black)" id="Path" />
          </svg>
        </div>
        <div className="absolute inset-[14.29%_4.69%_54.84%_6.25%]" data-name="Path">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.934 4.53007">
            <path d={svgPaths.p83e9580} fill="var(--fill-0, #3C3C43)" fillOpacity="0.3" id="Path" />
          </svg>
        </div>
      </div>
      <div className="h-[14.672px] relative shrink-0 w-[26.2px]" data-name="Battery / Light">
        <div className="absolute h-[12.576px] left-[8.38px] top-[1.05px] w-[8.384px]" data-name="􀋦">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.384 12.576">
            <path d={svgPaths.pff43680} fill="var(--fill-0, black)" id="ô¦" />
          </svg>
        </div>
        <div className="absolute h-[12.576px] left-0 top-[1.05px] w-[24.104px]" data-name="Subtract">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.104 12.576">
            <g id="Subtract">
              <path d={svgPaths.pcf60780} fill="var(--fill-0, #3C3C43)" fillOpacity="0.6" />
              <path d={svgPaths.p3ead12c0} fill="var(--fill-0, #3C3C43)" fillOpacity="0.6" />
            </g>
          </svg>
        </div>
        <div className="absolute h-[4.192px] left-[25.15px] top-[5.24px] w-[1.048px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.048 4.192">
            <path d={svgPaths.p20292e80} fill="var(--fill-0, #3C3C43)" fillOpacity="0.6" id="Rectangle 23" />
          </svg>
        </div>
        <Battery />
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[15.72px] left-[calc(50%+0.52px)] top-1/2 w-[34.584px]" data-name="9:41">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.584 15.72">
        <g id="9:41">
          <g id="9:41_2">
            <path d={svgPaths.p289a1600} fill="var(--fill-0, black)" />
            <path d={svgPaths.p3783d400} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2828fb00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p9561100} fill="var(--fill-0, black)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function Bronte() {
  return (
    <div className="bg-[#fbfaf9] relative size-full" data-name="Bronte">
      <Logo />
      <Container1 />
      <Logo1 />
      <div className="-translate-x-1/2 absolute bottom-[806px] h-[46px] left-1/2 overflow-clip w-[393px]" data-name="Status Bar">
        <div className="absolute h-[31.44px] left-0 right-0 top-0" data-name="Notch" />
        <StatusIcons />
        <div className="absolute right-[74.41px] size-[6.288px] top-[8.38px]" data-name="Indicator" />
        <div className="absolute h-[22.008px] left-[22.01px] overflow-clip rounded-[20px] top-[12.58px] w-[56.592px]" data-name="Time / Light">
          <Component />
        </div>
      </div>
    </div>
  );
}