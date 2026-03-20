import svgPaths from "./svg-opezru6mrq";

function Text() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text">
      <div className="flex flex-col font-['Aleo:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#323232] text-[22px] tracking-[0.3px] whitespace-nowrap">
        <p className="leading-[normal]">Bronte</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#36609e] content-stretch flex items-center justify-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Container">
      <p className="font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[15px] not-italic relative shrink-0 text-[10px] text-white tracking-[0.5px] uppercase whitespace-nowrap">BETA</p>
    </div>
  );
}

function LogoFrame() {
  return (
    <div className="h-[26px] relative shrink-0" data-name="Logo Frame">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] h-full items-center relative">
        <Text />
        <Container />
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="logo">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[24px] py-[19px] relative size-full">
          <LogoFrame />
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_55_575)" id="Icon">
          <path d={svgPaths.p2df95170} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.80556" />
          <path d={svgPaths.pe1cfb00} id="Vector_2" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.80556" />
        </g>
        <defs>
          <clipPath id="clip0_55_575">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[40px] mix-blend-multiply relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
          <Icon />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#323232] text-[14px] whitespace-nowrap">Recent</p>
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pa6d0980} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[40px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
          <Icon1 />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#525a70] text-[14px] whitespace-nowrap">Favorites</p>
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p245c2480} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1b9ecd80} id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p30483c80} id="Vector_3" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p37f93a00} id="Vector_4" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p26fdf80} id="Vector_5" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[40px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
          <Icon2 />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#525a70] text-[14px] whitespace-nowrap">Shared with me</p>
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p25fc4100} id="Vector" stroke="var(--stroke-0, #B8B8B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#e9e9e9] h-[40px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
          <Icon3 />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#525a70] text-[14px] whitespace-nowrap">Admin</p>
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[12px] relative w-full">
          <Container2 />
          <Container3 />
          <Container4 />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="absolute inset-[5%]" data-name="Vector">
          <div className="absolute inset-[-4.17%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 19.5">
              <path d={svgPaths.p2b51b800} id="Vector" stroke="var(--stroke-0, #999999)" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-[15%] not-italic right-[15%] text-[#999] text-[9px] text-center top-1/2 whitespace-nowrap">
          <p className="leading-[normal]">CH</p>
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] w-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#525a70] text-[14px] whitespace-nowrap">{`Chemistry & Life Sciences`}</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="bg-[#f7f7f7] relative rounded-[10px] shrink-0 size-[20px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#525a70] text-[10px] text-center w-full">
          <p className="leading-[normal]">9</p>
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center p-[12px] relative w-full">
          <Icon4 />
          <Text1 />
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="absolute inset-[5%]" data-name="Vector">
          <div className="absolute inset-[-4.17%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 19.5">
              <path d={svgPaths.p2b51b800} id="Vector" stroke="var(--stroke-0, #999999)" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-[12.5%] not-italic right-[12.5%] text-[#999] text-[9px] text-center top-1/2 whitespace-nowrap">
          <p className="leading-[normal]">MA</p>
        </div>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] w-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#525a70] text-[14px] whitespace-nowrap">{`Math & Engineering`}</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="bg-[rgba(247,247,247,0.62)] relative rounded-[10px] shrink-0 size-[20px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#525a70] text-[10px] text-center w-full">
          <p className="leading-[16px]">3</p>
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center p-[12px] relative w-full">
          <Icon5 />
          <Text3 />
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="absolute inset-[5%]" data-name="Vector">
          <div className="absolute inset-[-4.17%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 19.5">
              <path d={svgPaths.p2b51b800} id="Vector" stroke="var(--stroke-0, #999999)" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-[17.5%] not-italic right-[17.5%] text-[#999] text-[9px] text-center top-1/2 whitespace-nowrap">
          <p className="leading-[normal]">BU</p>
        </div>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] w-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#525a70] text-[14px] whitespace-nowrap">Business Fundamentals</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="bg-[rgba(247,247,247,0.62)] relative rounded-[10px] shrink-0 size-[20px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#525a70] text-[10px] text-center whitespace-nowrap">
          <p className="leading-[16px]">1</p>
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center p-[12px] relative w-full">
          <Icon6 />
          <Text5 />
          <Text6 />
        </div>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="absolute inset-[5%]" data-name="Vector">
          <div className="absolute inset-[-4.17%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 19.5">
              <path d={svgPaths.p2b51b800} id="Vector" stroke="var(--stroke-0, #999999)" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-[17.5%] not-italic right-[17.5%] text-[#999] text-[9px] text-center top-1/2 whitespace-nowrap">
          <p className="leading-[normal]">EC</p>
        </div>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] w-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#525a70] text-[14px] whitespace-nowrap">{`Economics & Policy`}</p>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="bg-[rgba(247,247,247,0.62)] relative rounded-[10px] shrink-0 size-[20px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#525a70] text-[10px] text-center w-full">
          <p className="leading-[16px]">2</p>
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center p-[12px] relative w-full">
          <Icon7 />
          <Text7 />
          <Text8 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[12px] relative size-full">
          <Container7 />
          <Container8 />
          <Container9 />
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function NavItems() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative rounded-[12px] w-full" data-name="nav items">
      <Container1 />
      <Container6 />
    </div>
  );
}

function Nav() {
  return (
    <div className="bg-[#fbfaf9] content-stretch flex flex-col h-full items-start relative shrink-0 w-[296px]" data-name="nav">
      <Logo />
      <NavItems />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M11.25 13.5L6.75 9L11.25 4.5" id="Vector" stroke="var(--stroke-0, #323232)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(233,233,233,0.4)] relative rounded-[16px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[7px] relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Button />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#323232] text-[20px] tracking-[0.2px] whitespace-nowrap">Admin</p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_679)" id="Icon">
          <path d={svgPaths.p3111f900} id="Vector" stroke="var(--stroke-0, #636C85)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          <path d={svgPaths.p2bf069e0} id="Vector_2" stroke="var(--stroke-0, #636C85)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          <path d="M10 14.1669H10.0087" id="Vector_3" stroke="var(--stroke-0, #636C85)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
        </g>
        <defs>
          <clipPath id="clip0_1_679">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[11px] relative rounded-[20px] shrink-0 size-[32px]" data-name="Button">
      <Icon9 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p30d1180} id="Vector" stroke="var(--stroke-0, #636C85)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          <path d={svgPaths.pac08680} id="Vector_2" stroke="var(--stroke-0, #636C85)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[32px]" data-name="Button">
      <Icon10 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p79b8680} id="Vector" stroke="var(--stroke-0, #636C85)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[32px]" data-name="Button">
      <Icon11 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="bg-[#934790] content-stretch flex flex-col h-full items-center justify-center overflow-clip relative rounded-[24px] shrink-0 w-[32px]" data-name="Icon">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[13px] text-center text-white tracking-[0.13px] whitespace-nowrap">LD</p>
    </div>
  );
}

function ActionButtonsFrame() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Action Buttons Frame">
      <Button1 />
      <Button2 />
      <Button3 />
      <div className="flex flex-row items-center self-stretch">
        <Icon12 />
      </div>
    </div>
  );
}

function ContentHeaderFrame() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Content Header Frame">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] relative size-full">
          <Container11 />
          <ActionButtonsFrame />
        </div>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13px] not-italic relative shrink-0 text-[#934790] text-[13px] whitespace-nowrap">Admin</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[rgba(147,71,144,0.1)] h-[32px] relative rounded-[16px] shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center px-[16px] py-[8px] relative">
        <Text9 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[40px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] h-full items-center relative">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#323232] text-[32px] tracking-[0.32px] whitespace-nowrap">Laura Driesdale</p>
        <Container16 />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[10px] relative shrink-0 w-[12.5px]">
      <div className="absolute inset-[-6.25%_-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.7502 11.25">
          <g id="Frame 1000005160">
            <path d={svgPaths.p24adc300} id="Vector" stroke="var(--stroke-0, #636C85)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
            <path d={svgPaths.p15a32600} id="Vector_2" stroke="var(--stroke-0, #636C85)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip px-px py-[3px] relative shrink-0 size-[16px]" data-name="Icon">
      <Frame />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[20px] relative shrink-0 w-[296px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon13 />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#636c85] text-[14px] tracking-[0.14px] whitespace-nowrap">
          <p className="leading-[normal]">laura.driesdale@company.com</p>
        </div>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="h-[14px] relative shrink-0 w-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14">
        <g id="Icon">
          <path d="M5.33333 1.16667V3.5" id="Vector" stroke="var(--stroke-0, #636C85)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M10.6667 1.16667V3.5" id="Vector_2" stroke="var(--stroke-0, #636C85)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3bcf7800} id="Vector_3" stroke="var(--stroke-0, #636C85)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M2 5.83333H14" id="Vector_4" stroke="var(--stroke-0, #636C85)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Icon14 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[20px] relative shrink-0 w-[296px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Frame1 />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#636c85] text-[13px] tracking-[0.13px] whitespace-nowrap">
          <p className="leading-[normal]">Joined Nov 3, 2022</p>
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-[296.266px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative w-full">
        <Container18 />
        <Container19 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start justify-center relative size-full">
        <Container15 />
        <Container17 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[112px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 112 112">
          <path d={svgPaths.p39c9cb70} fill="var(--fill-0, #934790)" id="Vector" />
        </svg>
        <div className="absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold inset-[27.68%_0] justify-center leading-[0] not-italic text-[40px] text-center text-white tracking-[2px]">
          <p className="leading-[normal]">LD</p>
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[48px] items-start relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Icon15 />
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[48px] py-[24px] relative w-full">
        <Container13 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#323232] border-b-3 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[19px] px-[16px] relative">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#323232] text-[15px] tracking-[0.15px] whitespace-nowrap">Projects</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[18px] px-[16px] relative">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#525a70] text-[15px] tracking-[0.15px] whitespace-nowrap">Teams</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[18px] px-[16px] relative">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#525a70] text-[15px] tracking-[0.15px] whitespace-nowrap">Workspaces</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start pb-[18px] px-[16px] relative">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#525a70] text-[15px] tracking-[0.15px] whitespace-nowrap">Permissions</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex items-start pt-[16px] relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container23 />
      <Container24 />
      <Container25 />
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#cecece] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-end size-full">
        <div className="content-stretch flex flex-col items-start justify-end px-[24px] relative size-full">
          <Container21 />
        </div>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[20px] items-center min-h-px min-w-px relative" data-name="Text">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#636c85] text-[14px] w-[45px]">
        <p className="leading-[normal]">Owner</p>
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #CECECE)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex items-center justify-center px-[4px] relative shrink-0 size-[20px]" data-name="Text">
      <Icon16 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between pl-[16px] pr-[12px] relative rounded-[16px] shrink-0 w-[240px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Text10 />
      <Text11 />
    </div>
  );
}

function Text12() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">
          <p className="leading-[normal]">Last Modified</p>
        </div>
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #CECECE)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text13() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[4px] relative size-full">
        <Icon17 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between pl-[17px] pr-[13px] py-px relative rounded-[16px] shrink-0 w-[240px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Text12 />
      <Text13 />
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <Container28 />
        <Container29 />
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2535ca80} id="Vector" stroke="var(--stroke-0, #323232)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p9e34f00} id="Vector_2" stroke="var(--stroke-0, #323232)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10.5 3H15.75" id="Vector_3" stroke="var(--stroke-0, #323232)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10.5 6.75H15.75" id="Vector_4" stroke="var(--stroke-0, #323232)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10.5 11.25H15.75" id="Vector_5" stroke="var(--stroke-0, #323232)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10.5 15H15.75" id="Vector_6" stroke="var(--stroke-0, #323232)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 size-[36px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#cecece] border-r border-solid inset-0 pointer-events-none rounded-bl-[8px] rounded-tl-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[8px] pr-[9px] relative size-full">
        <Icon18 />
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2535ca80} id="Vector" stroke="var(--stroke-0, #D0D0D0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pf238580} id="Vector_2" stroke="var(--stroke-0, #D0D0D0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27453880} id="Vector_3" stroke="var(--stroke-0, #D0D0D0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p9e34f00} id="Vector_4" stroke="var(--stroke-0, #D0D0D0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[9px] relative size-full">
        <Icon19 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="relative rounded-[8px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center p-px relative">
        <Button4 />
        <Button5 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[36px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] h-full items-center relative">
        <Container31 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[24px] pr-[48px] py-[32px] relative w-full">
          <Container27 />
          <Container30 />
        </div>
      </div>
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="content-stretch flex items-start pb-[16px] pl-[16px] pr-[20px] relative shadow-[0px_1px_0px_0px_#f9fafb] shrink-0 w-[702px]" data-name="Header Cell">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#636c85] text-[13px] tracking-[0.13px] whitespace-nowrap">Project Name</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="h-full relative shadow-[0px_1px_0px_0px_#f9fafb] shrink-0 w-[387px]" data-name="Header Cell">
      <div className="content-stretch flex items-start pb-[6px] px-[20px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#636c85] text-[13px] tracking-[0.13px] whitespace-nowrap">Owner</p>
      </div>
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

function HeaderCell2() {
  return (
    <div className="h-full relative shadow-[0px_1px_0px_0px_#f9fafb] shrink-0 w-[229px]" data-name="Header Cell">
      <div className="content-stretch flex gap-[4px] items-start pb-[6px] px-[20px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#323232] text-[13px] tracking-[0.13px] whitespace-nowrap">Last Modified</p>
        <SortIcon />
      </div>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative shadow-[0px_1px_0px_0px_#f9fafb]" data-name="Header Cell">
      <div className="size-full" />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative self-stretch" data-name="container">
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Table Header">
      <HeaderCell />
      <Container34 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <g id="Vector" />
          <path d={svgPaths.p1236d200} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container36() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon20 />
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[21px] relative shrink-0 w-[379.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">{`Anatomy & Physiology: The Unity of Forzm and Function`}</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container36 />
      <Text14 />
    </div>
  );
}

function TableCell() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[20px] py-[16px] relative size-full">
          <Container35 />
        </div>
      </div>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[20px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Vivian Holloway</p>
        </div>
      </div>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 w-[229px]" data-name="Table Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#525a70] text-[14px] whitespace-nowrap">Nov 3, 2022</p>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pa6d0980} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon21 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3f4e600} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_3" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon22 />
    </div>
  );
}

function TableCell3() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button6 />
      <Button7 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center min-h-px min-w-px relative" data-name="Table Row 1">
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
    </div>
  );
}

function TableRow() {
  return (
    <div className="content-stretch flex h-[72px] items-center relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#cecece] border-b border-solid inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
      <TableCell />
      <TableRow1 />
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <g id="Vector" />
          <path d={svgPaths.p1236d200} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container38() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Biochemistry, 9th Edition</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container38 />
      <Text15 />
    </div>
  );
}

function TableCell4() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container37 />
        </div>
      </div>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[22px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Elias Thorne</p>
        </div>
      </div>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 w-[229px]" data-name="Table Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Jan 15, 2023</p>
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pa6d0980} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon24 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3f4e600} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_3" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon25 />
    </div>
  );
}

function TableCell7() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button8 />
      <Button9 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative" data-name="Table Row 2">
      <TableCell5 />
      <TableCell6 />
      <TableCell7 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-between relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#cecece] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center self-stretch">
        <TableCell4 />
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <TableRow3 />
      </div>
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <g id="Vector" />
          <path d={svgPaths.p1236d200} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon26 />
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Microbiology: An Introduction, 13th Edition</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Text16 />
    </div>
  );
}

function TableCell8() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container39 />
        </div>
      </div>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[22px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Clementine Fairweather</p>
        </div>
      </div>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 w-[229px]" data-name="Table Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Jan 15, 2023</p>
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pa6d0980} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon27 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3f4e600} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_3" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon28 />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button10 />
      <Button11 />
    </div>
  );
}

function TableRow5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative" data-name="Table Row 3">
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
    </div>
  );
}

function TableRow4() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-between relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#cecece] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center self-stretch">
        <TableCell8 />
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <TableRow5 />
      </div>
    </div>
  );
}

function Icon29() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <g id="Vector" />
          <path d={svgPaths.p1236d200} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon29 />
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Fundamentals of Differential Equations, 9th Edition</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Text17 />
    </div>
  );
}

function TableCell12() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container41 />
        </div>
      </div>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[22px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Montgomery Bellweather</p>
        </div>
      </div>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 w-[229px]" data-name="Table Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Jan 15, 2023</p>
    </div>
  );
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pa6d0980} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon30 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3f4e600} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_3" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon31 />
    </div>
  );
}

function TableCell15() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button12 />
      <Button13 />
    </div>
  );
}

function TableRow7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative" data-name="Table Row 4">
      <TableCell13 />
      <TableCell14 />
      <TableCell15 />
    </div>
  );
}

function TableRow6() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-between relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#cecece] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center self-stretch">
        <TableCell12 />
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <TableRow7 />
      </div>
    </div>
  );
}

function Icon32() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <g id="Vector" />
          <path d={svgPaths.p1236d200} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon32 />
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Precalculus, 11th Edition</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container44 />
      <Text18 />
    </div>
  );
}

function TableCell16() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container43 />
        </div>
      </div>
    </div>
  );
}

function TableCell17() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[22px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Evangeline Ashworth</p>
        </div>
      </div>
    </div>
  );
}

function TableCell18() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 w-[229px]" data-name="Table Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Jan 15, 2023</p>
    </div>
  );
}

function Icon33() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pa6d0980} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon33 />
    </div>
  );
}

function Icon34() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3f4e600} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_3" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon34 />
    </div>
  );
}

function TableCell19() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button14 />
      <Button15 />
    </div>
  );
}

function TableRow9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative" data-name="Table Row 5">
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
    </div>
  );
}

function TableRow8() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-between relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#cecece] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center self-stretch">
        <TableCell16 />
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <TableRow9 />
      </div>
    </div>
  );
}

function Icon35() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <g id="Vector" />
          <path d={svgPaths.p1236d200} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon35 />
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Calculus, 14th Edition</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <Text19 />
    </div>
  );
}

function TableCell20() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container45 />
        </div>
      </div>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[22px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Jasper Blackwood</p>
        </div>
      </div>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 w-[229px]" data-name="Table Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Jan 15, 2023</p>
    </div>
  );
}

function Icon36() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pa6d0980} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon36 />
    </div>
  );
}

function Icon37() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3f4e600} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_3" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button17() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon37 />
    </div>
  );
}

function TableCell23() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button16 />
      <Button17 />
    </div>
  );
}

function TableRow11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative" data-name="Table Row 6">
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
    </div>
  );
}

function TableRow10() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-between relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#cecece] border-b border-solid inset-0 pointer-events-none" />
      <TableCell20 />
      <TableRow11 />
    </div>
  );
}

function Icon38() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <g id="Vector" />
          <path d={svgPaths.p1236d200} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container48() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon38 />
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Organic Chemistry, 10th Edition</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container48 />
      <Text20 />
    </div>
  );
}

function TableCell24() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container47 />
        </div>
      </div>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[22px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Seraphina Sterling</p>
        </div>
      </div>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 w-[229px]" data-name="Table Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Jan 15, 2023</p>
    </div>
  );
}

function Icon39() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pa6d0980} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button18() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon39 />
    </div>
  );
}

function Icon40() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3f4e600} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_3" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon40 />
    </div>
  );
}

function TableCell27() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button18 />
      <Button19 />
    </div>
  );
}

function TableRow13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative" data-name="Table Row 7">
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
    </div>
  );
}

function TableRow12() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-between relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#cecece] border-b border-solid inset-0 pointer-events-none" />
      <TableCell24 />
      <TableRow13 />
    </div>
  );
}

function Icon41() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <g id="Vector" />
          <path d={svgPaths.p1236d200} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container50() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon41 />
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Physics for Scientists and Engineers, 4th Edition</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container50 />
      <Text21 />
    </div>
  );
}

function TableCell28() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container49 />
        </div>
      </div>
    </div>
  );
}

function TableCell29() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[22px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Genevieve Lovelace</p>
        </div>
      </div>
    </div>
  );
}

function TableCell30() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 w-[229px]" data-name="Table Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Jan 15, 2023</p>
    </div>
  );
}

function Icon42() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pa6d0980} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button20() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon42 />
    </div>
  );
}

function Icon43() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3f4e600} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_3" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button21() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon43 />
    </div>
  );
}

function TableCell31() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button20 />
      <Button21 />
    </div>
  );
}

function TableRow15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative" data-name="Table Row 8">
      <TableCell29 />
      <TableCell30 />
      <TableCell31 />
    </div>
  );
}

function TableRow14() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-between relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#cecece] border-b border-solid inset-0 pointer-events-none" />
      <TableCell28 />
      <TableRow15 />
    </div>
  );
}

function Icon44() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <g id="Vector" />
          <path d={svgPaths.p1236d200} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container52() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon44 />
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">General Chemistry, 11th Edition</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container52 />
      <Text22 />
    </div>
  );
}

function TableCell32() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container51 />
        </div>
      </div>
    </div>
  );
}

function TableCell33() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[22px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Thaddeus Finch</p>
        </div>
      </div>
    </div>
  );
}

function TableCell34() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 w-[229px]" data-name="Table Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Jan 15, 2023</p>
    </div>
  );
}

function Icon45() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pa6d0980} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button22() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon45 />
    </div>
  );
}

function Icon46() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3f4e600} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_3" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button23() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon46 />
    </div>
  );
}

function TableCell35() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button22 />
      <Button23 />
    </div>
  );
}

function TableRow17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative" data-name="Table Row 9">
      <TableCell33 />
      <TableCell34 />
      <TableCell35 />
    </div>
  );
}

function TableRow16() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-between relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#cecece] border-b border-solid inset-0 pointer-events-none" />
      <TableCell32 />
      <TableRow17 />
    </div>
  );
}

function Icon47() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <g id="Vector" />
          <path d={svgPaths.p1236d200} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container54() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon47 />
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Essential Cell Biology, 5th Edition</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container54 />
      <Text23 />
    </div>
  );
}

function TableCell36() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container53 />
        </div>
      </div>
    </div>
  );
}

function TableCell37() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[22px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Isolde Hawthorne</p>
        </div>
      </div>
    </div>
  );
}

function TableCell38() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 w-[229px]" data-name="Table Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Jan 15, 2023</p>
    </div>
  );
}

function Icon48() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pa6d0980} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button24() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon48 />
    </div>
  );
}

function Icon49() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3f4e600} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_3" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button25() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon49 />
    </div>
  );
}

function TableCell39() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button24 />
      <Button25 />
    </div>
  );
}

function TableRow19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative" data-name="Table Row 10">
      <TableCell37 />
      <TableCell38 />
      <TableCell39 />
    </div>
  );
}

function TableRow18() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-between relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#cecece] border-b border-solid inset-0 pointer-events-none" />
      <TableCell36 />
      <TableRow19 />
    </div>
  );
}

function Icon50() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <g id="Vector" />
          <path d={svgPaths.p1236d200} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container56() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon50 />
      </div>
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Principles of Genetics, 8th Edition</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container56 />
      <Text24 />
    </div>
  );
}

function TableCell40() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container55 />
        </div>
      </div>
    </div>
  );
}

function TableCell41() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[22px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Barnaby Ainsworth</p>
        </div>
      </div>
    </div>
  );
}

function TableCell42() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 w-[229px]" data-name="Table Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Jan 15, 2023</p>
    </div>
  );
}

function Icon51() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pa6d0980} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button26() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon51 />
    </div>
  );
}

function Icon52() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3f4e600} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_3" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button27() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon52 />
    </div>
  );
}

function TableCell43() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button26 />
      <Button27 />
    </div>
  );
}

function TableRow21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative" data-name="Table Row 11">
      <TableCell41 />
      <TableCell42 />
      <TableCell43 />
    </div>
  );
}

function TableRow20() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-between relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#cecece] border-b border-solid inset-0 pointer-events-none" />
      <TableCell40 />
      <TableRow21 />
    </div>
  );
}

function Icon53() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <g id="Vector" />
          <path d={svgPaths.p1236d200} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container58() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon53 />
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">{`Human Anatomy & Physiology, 11th Edition`}</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container58 />
      <Text25 />
    </div>
  );
}

function TableCell44() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container57 />
        </div>
      </div>
    </div>
  );
}

function TableCell45() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[22px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Persephone Nightshade</p>
        </div>
      </div>
    </div>
  );
}

function TableCell46() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 w-[229px]" data-name="Table Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Jan 15, 2023</p>
    </div>
  );
}

function Icon54() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pa6d0980} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button28() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon54 />
    </div>
  );
}

function Icon55() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3f4e600} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_3" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button29() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon55 />
    </div>
  );
}

function TableCell47() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button28 />
      <Button29 />
    </div>
  );
}

function TableRow23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative" data-name="Table Row 12">
      <TableCell45 />
      <TableCell46 />
      <TableCell47 />
    </div>
  );
}

function TableRow22() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-between relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#cecece] border-b border-solid inset-0 pointer-events-none" />
      <TableCell44 />
      <TableRow23 />
    </div>
  );
}

function Icon56() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <g id="Vector" />
          <path d={svgPaths.p1236d200} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container60() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon56 />
      </div>
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Introduction to Chemical Engineering, 8th Edition</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container60 />
      <Text26 />
    </div>
  );
}

function TableCell48() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container59 />
        </div>
      </div>
    </div>
  );
}

function TableCell49() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[22px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Alistair Blackthorn</p>
        </div>
      </div>
    </div>
  );
}

function TableCell50() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0 w-[229px]" data-name="Table Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Jan 15, 2023</p>
    </div>
  );
}

function Icon57() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pa6d0980} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button30() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon57 />
    </div>
  );
}

function Icon58() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3f4e600} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_2" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_3" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button31() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon58 />
    </div>
  );
}

function TableCell51() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button30 />
      <Button31 />
    </div>
  );
}

function TableRow25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative" data-name="Table Row 13">
      <TableCell49 />
      <TableCell50 />
      <TableCell51 />
    </div>
  );
}

function TableRow24() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-between relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#cecece] border-b border-solid inset-0 pointer-events-none" />
      <TableCell48 />
      <TableRow25 />
    </div>
  );
}

function Icon59() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <g id="Vector" />
          <path d={svgPaths.p1236d200} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container62() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon59 />
      </div>
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Molecular Biology of the Cell, 7th Edition</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container62 />
      <Text27 />
    </div>
  );
}

function TableCell52() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[713px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container61 />
        </div>
      </div>
    </div>
  );
}

function TableCell53() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[22px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">{`Chemistry & Life Sciences`}</p>
        </div>
      </div>
    </div>
  );
}

function TableCell54() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-br-[8px] rounded-tr-[8px]" data-name="Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[22px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Jan 15, 2023</p>
        </div>
      </div>
    </div>
  );
}

function TableRow27() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative" data-name="Table Row 14">
      <TableCell53 />
      <TableCell54 />
    </div>
  );
}

function TableRow26() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-between relative shrink-0 w-full" data-name="Table Row">
      <TableCell52 />
      <TableRow27 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[16px] w-full" data-name="Table Body">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <TableRow />
        <TableRow2 />
        <TableRow4 />
        <TableRow6 />
        <TableRow8 />
        <TableRow10 />
        <TableRow12 />
        <TableRow14 />
        <TableRow16 />
        <TableRow18 />
        <TableRow20 />
        <TableRow22 />
        <TableRow24 />
        <TableRow26 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Table() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Table">
      <div className="content-stretch flex flex-col items-start px-[24px] relative size-full">
        <TableHeader />
        <TableBody />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Table />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[32px] relative size-full">
          <Container33 />
        </div>
      </div>
    </div>
  );
}

function ContentBodyFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="Content Body Frame">
      <Container12 />
      <Container20 />
      <Container26 />
      <Container32 />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px relative" data-name="content">
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none" />
      <ContentHeaderFrame />
      <ContentBodyFrame />
    </div>
  );
}

function MainFrame() {
  return (
    <div className="absolute content-stretch flex h-[1172px] items-center left-0 top-0 w-[1786px]" data-name="Main Frame">
      <Nav />
      <Content />
    </div>
  );
}

export default function Bronte() {
  return (
    <div className="bg-[#fefefe] relative size-full" data-name="Bronte">
      <MainFrame />
    </div>
  );
}