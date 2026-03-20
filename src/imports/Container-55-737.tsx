import svgPaths from "./svg-5os55zlvdm";

function Text() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13px] not-italic relative shrink-0 text-[#934790] text-[13px] whitespace-nowrap">Admin</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[rgba(147,71,144,0.1)] h-[32px] relative rounded-[16px] shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center px-[16px] py-[8px] relative">
        <Text />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[40px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] h-full items-center relative">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#323232] text-[32px] tracking-[0.32px] whitespace-nowrap">Laura Driesdale</p>
        <Container4 />
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

function Icon() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip px-px py-[3px] relative shrink-0 size-[16px]" data-name="Icon">
      <Frame />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[296px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#636c85] text-[14px] tracking-[0.14px] whitespace-nowrap">
          <p className="leading-[normal]">laura.driesdale@company.com</p>
        </div>
      </div>
    </div>
  );
}

function Icon1() {
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
        <Icon1 />
      </div>
    </div>
  );
}

function Container7() {
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

function Container5() {
  return (
    <div className="relative shrink-0 w-[296.266px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative w-full">
        <Container6 />
        <Container7 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start justify-center relative size-full">
        <Container3 />
        <Container5 />
      </div>
    </div>
  );
}

function Icon2() {
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

function Container1() {
  return (
    <div className="content-stretch flex gap-[48px] items-start relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Icon2 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col items-start px-[48px] py-[24px] relative size-full" data-name="Container">
      <Container1 />
    </div>
  );
}