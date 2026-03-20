import svgPaths from "./svg-95o7ocf04i";

function Team() {
  return (
    <div className="h-[140px] relative shrink-0 w-[285px]" data-name="team">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 285 140">
        <g id="team">
          <rect fill="var(--fill-0, #D58C6F)" height="140" rx="12" width="285" />
          <path d={svgPaths.p211b8880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Pictogram() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px overflow-clip relative rounded-tl-[12px] rounded-tr-[12px]" data-name="pictogram">
      <Team />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex h-[140px] items-start justify-center relative shrink-0 w-full">
      <Pictogram />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <p className="font-['Figtree:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#525a70] text-[16px] w-full">Marketing Management: Analysis, Planning, Implementation, and …</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame1 />
    </div>
  );
}

function Top() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-center relative shrink-0 w-full" data-name="Top">
      <Frame />
      <Frame3 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Figtree:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#525a70] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Quinn Harris</p>
      </div>
    </div>
  );
}

function Bottom() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Bottom">
      <Frame2 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Bottom />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p9966100} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3694d280} id="Vector_2" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1f197700} id="Vector_3" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p30f34b00} id="Vector_4" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Icon />
    </div>
  );
}

function Meta() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Meta">
      <Container />
      <div className="flex flex-col font-['Figtree:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#525a70] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">6 members</p>
      </div>
    </div>
  );
}

function Favorite() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="favorite">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g clipPath="url(#clip0_2002_64)" id="favorite">
          <g id="Vector" />
          <path d={svgPaths.p28458600} fill="var(--fill-0, #525A70)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_2002_64">
            <rect fill="white" height="32" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function More() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="more">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="more">
          <path d={svgPaths.p32c20880} fill="var(--fill-0, #525A70)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconButtons1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start justify-end relative shrink-0" data-name="icon buttons">
      <Favorite />
      <More />
    </div>
  );
}

function IconButtons() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="icon buttons">
      <Meta />
      <IconButtons1 />
    </div>
  );
}

export default function ProjectTile() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] items-start overflow-clip pb-[32px] pt-[24px] px-[24px] relative rounded-[16px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05),0px_1px_3px_0px_rgba(0,0,0,0.08),0px_4px_6px_0px_rgba(50,50,93,0.11)] size-full" data-name="project tile">
      <Top />
      <Frame4 />
      <IconButtons />
    </div>
  );
}