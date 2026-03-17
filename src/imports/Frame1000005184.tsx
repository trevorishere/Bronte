function Text() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#636c85] text-[14px] whitespace-nowrap">Owner</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #CECECE)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[4px] relative shrink-0 size-[20px]" data-name="Text">
      <Icon />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white content-stretch flex h-[40px] items-center justify-between left-[55px] pl-[20px] pr-[16px] rounded-tl-[16px] rounded-tr-[16px] top-[73px] w-[240px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
      <Text />
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[100.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[#525a70] text-[14px] top-0 whitespace-nowrap">Bradley Lawlor</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="relative rounded-[7.5px] shrink-0 size-[15px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[rgba(82,90,112,0.2)] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Text2 />
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[21px] relative shrink-0 w-[106.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[#525a70] text-[14px] top-0 whitespace-nowrap">Daniel Hamilton</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="relative rounded-[7.5px] shrink-0 size-[15px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[rgba(82,90,112,0.2)] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
          <Text4 />
          <Text5 />
        </div>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[21px] relative shrink-0 w-[78.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[#525a70] text-[14px] top-0 whitespace-nowrap">David Elson</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="relative rounded-[7.5px] shrink-0 size-[15px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[rgba(82,90,112,0.2)] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
          <Text6 />
          <Text7 />
        </div>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[21px] relative shrink-0 w-[71.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[#525a70] text-[14px] top-0 whitespace-nowrap">Katie Sims</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="relative rounded-[7.5px] shrink-0 size-[15px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[rgba(82,90,112,0.2)] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
          <Text8 />
          <Text9 />
        </div>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[21px] relative shrink-0 w-[94.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[#525a70] text-[14px] top-0 whitespace-nowrap">Kenneth Allen</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="relative rounded-[7.5px] shrink-0 size-[15px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[rgba(82,90,112,0.2)] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
          <Text10 />
          <Text11 />
        </div>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[21px] relative shrink-0 w-[111.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[#525a70] text-[14px] top-0 whitespace-nowrap">Rahim Andersen</p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="relative rounded-[7.5px] shrink-0 size-[15px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[rgba(82,90,112,0.2)] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
          <Text12 />
          <Text13 />
        </div>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[21px] relative shrink-0 w-[106.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[#525a70] text-[14px] top-0 whitespace-nowrap">Rhonda Rhodes</p>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="relative rounded-[7.5px] shrink-0 size-[15px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[rgba(82,90,112,0.2)] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
          <Text14 />
          <Text15 />
        </div>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[21px] relative shrink-0 w-[79.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[#525a70] text-[14px] top-0 whitespace-nowrap">Ricky Smith</p>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="relative rounded-[7.5px] shrink-0 size-[15px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[rgba(82,90,112,0.2)] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
          <Text16 />
          <Text17 />
        </div>
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[21px] relative shrink-0 w-[87.234px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[#525a70] text-[14px] top-0 whitespace-nowrap">Wyatt Moran</p>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="relative rounded-[7.5px] shrink-0 size-[15px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[rgba(82,90,112,0.2)] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
          <Text18 />
          <Text19 />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-white left-[55px] rounded-bl-[16px] rounded-br-[16px] top-[113px] w-[240px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[8px] relative rounded-[inherit] w-full">
        <Container2 />
        <Container3 />
        <Container4 />
        <Container5 />
        <Container6 />
        <Container7 />
        <Container8 />
        <Container9 />
        <Container10 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-bl-[16px] rounded-br-[16px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.11)]" />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <Container />
      <Container1 />
    </div>
  );
}