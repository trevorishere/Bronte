import svgPaths from "./svg-pb7b7hcixj";
import { imgVector } from "./svg-j15zi";

function Paragraph() {
  return (
    <div className="h-[26px] relative shrink-0 w-[72.438px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Aleo:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#323232] text-[22px] tracking-[0.3px] whitespace-nowrap">Bronte</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[26px] relative shrink-0 w-[72.438px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center relative size-full">
        <Paragraph />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] h-[26px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container4 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[15px] relative shrink-0 w-[28.406px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[15px] left-0 not-italic text-[10px] text-white top-0 tracking-[0.5px] uppercase whitespace-nowrap">BETA</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#36609e] h-[19px] relative rounded-[4px] shrink-0 w-[40.406px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] relative size-full">
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[26px] relative shrink-0 w-[120.844px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container3 />
        <Container5 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] h-[64px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[24px] relative size-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[64px] relative shrink-0 w-[295px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container1 />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[9.37%_9.38%_9.38%_9.37%]" data-name="Group">
      <div className="absolute inset-[9.37%_9.38%_9.38%_9.37%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.875px_-1.875px] mask-size-[20px_20px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0555 18.0555">
            <path d={svgPaths.pb6be700} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.80556" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[28.01%_36.46%_39.49%_47.29%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-9.458px_-5.603px] mask-size-[20px_20px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-13.89%_-27.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.05575 8.30578">
            <path d={svgPaths.p3806a880} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.80556" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup />
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#525a70] text-[14px] top-0 whitespace-nowrap">Recent</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
          <Container9 />
          <Paragraph2 />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[40px] relative rounded-[12px] shrink-0 w-[271px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container8 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_12.2%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.24%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3348 17.5601">
            <path d={svgPaths.p31c92d00} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#323232] text-[14px] top-0 whitespace-nowrap">Favorites</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
          <Container11 />
          <Paragraph3 />
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#ececec] h-[40px] relative rounded-[12px] shrink-0 w-[271px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container10 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[62.5%_33.33%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 6.66667">
            <path d={svgPaths.p6877e0} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_45.83%_54.17%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.33333 8.33333">
            <path d={svgPaths.p3ffa2780} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[63.04%_8.33%_12.5%_79.17%]" data-name="Vector">
        <div className="absolute inset-[-17.04%_-33.33%_-17.04%_-33.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.16687 6.55854">
            <path d={svgPaths.p39df7200} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[13.04%_20.8%_54.67%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-12.91%_-33.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.1734 8.1254">
            <path d={svgPaths.p159fd500} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#525a70] text-[14px] top-0 whitespace-nowrap">Shared with me</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
          <Container13 />
          <Paragraph4 />
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[40px] relative rounded-[12px] shrink-0 w-[271px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container12 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_12.43%]" data-name="Vector">
        <div className="absolute inset-[-5%_-5.54%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.696 18.3333">
            <path d={svgPaths.p1f3cfb80} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66667">
            <path d={svgPaths.p2314a170} id="Vector" stroke="var(--stroke-0, #999999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#525a70] text-[14px] top-0 whitespace-nowrap">Admin</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
          <Container15 />
          <Paragraph5 />
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[12px] w-[271px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container14 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[184px] relative shrink-0 w-[295px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[12px] py-[12px] relative size-full">
        <Button />
        <Button1 />
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[32.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-[12px] not-italic text-[#999] text-[11px] top-[8px] tracking-[0.5px] uppercase whitespace-nowrap">Team Workspaces</p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[3.85%]" data-name="Vector">
        <div className="absolute inset-[-4.17%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 19.5">
            <path d={svgPaths.p2b51b800} id="Vector" stroke="var(--stroke-0, #999999)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[0.25px] size-[19.5px] top-[0.25px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[13.5px] left-[3.3px] top-[3.25px] w-[13.391px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.5px] left-[7px] not-italic text-[#999] text-[9px] text-center top-0 whitespace-nowrap">CH</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute left-[12px] size-[20px] top-[10px]" data-name="Container">
      <Container21 />
      <Paragraph7 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute h-[20px] left-[44px] overflow-clip top-[10px] w-[183px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#525a70] text-[14px] top-0 whitespace-nowrap">{`Chemistry & Life Sciences`}</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[15px] relative shrink-0 w-[12.313px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[6.5px] not-italic text-[#525a70] text-[10px] text-center top-0 whitespace-nowrap">20</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute bg-[#f7f7f7] content-stretch flex items-center justify-center left-[239px] px-[3.844px] rounded-[33554400px] size-[20px] top-[10px]" data-name="Container">
      <Paragraph9 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[271px]" data-name="Container">
      <Container20 />
      <Paragraph8 />
      <Container22 />
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[40px] relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <Container19 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[3.85%]" data-name="Vector">
        <div className="absolute inset-[-4.17%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 19.5">
            <path d={svgPaths.p2b51b800} id="Vector" stroke="var(--stroke-0, #999999)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[0.25px] size-[19.5px] top-[0.25px]" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[13.5px] left-[2.66px] top-[3.25px] w-[14.672px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.5px] left-[7.5px] not-italic text-[#999] text-[9px] text-center top-0 whitespace-nowrap">MA</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute left-[12px] size-[20px] top-[10px]" data-name="Container">
      <Container25 />
      <Paragraph10 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[20px] left-[44px] overflow-clip top-[10px] w-[183px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#525a70] text-[14px] top-0 whitespace-nowrap">{`Math & Engineering`}</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[15px] relative shrink-0 w-[10.813px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[5.5px] not-italic text-[#525a70] text-[10px] text-center top-0 whitespace-nowrap">18</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute bg-[#f7f7f7] content-stretch flex items-center justify-center left-[239px] px-[4.594px] rounded-[33554400px] size-[20px] top-[10px]" data-name="Container">
      <Paragraph12 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[271px]" data-name="Container">
      <Container24 />
      <Paragraph11 />
      <Container26 />
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[40px] relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <Container23 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[3.85%]" data-name="Vector">
        <div className="absolute inset-[-4.17%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 19.5">
            <path d={svgPaths.p2b51b800} id="Vector" stroke="var(--stroke-0, #999999)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[0.25px] size-[19.5px] top-[0.25px]" data-name="Container">
      <Icon6 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="absolute h-[13.5px] left-[3.73px] top-[3.25px] w-[12.531px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.5px] left-[6.5px] not-italic text-[#999] text-[9px] text-center top-0 whitespace-nowrap">BU</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute left-[12px] size-[20px] top-[10px]" data-name="Container">
      <Container29 />
      <Paragraph13 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="absolute h-[20px] left-[44px] overflow-clip top-[10px] w-[183px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#525a70] text-[14px] top-0 whitespace-nowrap">Business Fundamentals</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[15px] relative shrink-0 w-[11.016px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[6px] not-italic text-[#525a70] text-[10px] text-center top-0 whitespace-nowrap">13</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute bg-[#f7f7f7] content-stretch flex items-center justify-center left-[239px] pl-[4.484px] pr-[4.5px] rounded-[33554400px] size-[20px] top-[10px]" data-name="Container">
      <Paragraph15 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[271px]" data-name="Container">
      <Container28 />
      <Paragraph14 />
      <Container30 />
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[40px] relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <Container27 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[3.85%]" data-name="Vector">
        <div className="absolute inset-[-4.17%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 19.5">
            <path d={svgPaths.p2b51b800} id="Vector" stroke="var(--stroke-0, #999999)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[0.25px] size-[19.5px] top-[0.25px]" data-name="Container">
      <Icon7 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="absolute h-[13.5px] left-[3.91px] top-[3.25px] w-[12.172px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.5px] left-[6.5px] not-italic text-[#999] text-[9px] text-center top-0 whitespace-nowrap">EC</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute left-[12px] size-[20px] top-[10px]" data-name="Container">
      <Container33 />
      <Paragraph16 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="absolute h-[20px] left-[44px] overflow-clip top-[10px] w-[183px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#525a70] text-[14px] top-0 whitespace-nowrap">{`Economics & Policy`}</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[15px] relative shrink-0 w-[11.016px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[6px] not-italic text-[#525a70] text-[10px] text-center top-0 whitespace-nowrap">13</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute bg-[#f7f7f7] content-stretch flex items-center justify-center left-[239px] pl-[4.484px] pr-[4.5px] rounded-[33554400px] size-[20px] top-[10px]" data-name="Container">
      <Paragraph18 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[271px]" data-name="Container">
      <Container32 />
      <Paragraph17 />
      <Container34 />
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[40px] relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <Container31 />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[192.5px] relative shrink-0 w-[271px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph6 />
        <Button4 />
        <Button5 />
        <Button6 />
        <Button7 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[228.5px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pl-[12px] pt-[12px] relative size-full">
        <Container18 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[295px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container17 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[295px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container7 />
        <Container16 />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-[#fbfaf9] h-[972px] relative shrink-0 w-[296px]" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[#d0d0d0] border-r border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-px relative size-full">
        <Container />
        <Container6 />
      </div>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#323232] text-[20px] tracking-[0.2px] whitespace-nowrap">Favorites</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[24px] relative shrink-0 w-[91.297px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Paragraph19 />
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[8.33%]" data-name="Group">
      <div className="absolute inset-[8.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.667px_-1.667px] mask-size-[20px_20px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-5.63%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.5416 18.5416">
            <path d={svgPaths.p299a9d00} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.15%_37.83%_45.83%_37.88%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-7.575px_-5.83px] mask-size-[20px_20px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-18.74%_-19.3%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.73359 6.87899">
            <path d={svgPaths.p33146e80} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[29.17%] left-1/2 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10px_-14.167px] mask-size-[20px_20px] right-[49.96%] top-[70.83%]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-0.94px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.8837 1.875">
            <path d="M0.9375 0.9375H0.9462" id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group1 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup1 />
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 px-[6px] rounded-[33554400px] size-[32px] top-0" data-name="Button">
      <Container38 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pccb100} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[80px] px-[6px] rounded-[33554400px] size-[32px] top-0" data-name="Button">
      <Icon9 />
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="h-[16px] relative shrink-0 w-[17.094px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[13px] text-center text-white tracking-[0.13px] whitespace-nowrap">LD</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-[#934790] flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[33554400px]" data-name="Container">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[7.453px] relative size-full">
          <Paragraph20 />
        </div>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex items-center left-[120px] size-[32px] top-0" data-name="Container">
      <Container40 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1c3efea0} id="Vector" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p25877f40} id="Vector_2" stroke="var(--stroke-0, #525A70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[40px] px-[6px] rounded-[33554400px] size-[32px] top-0" data-name="Button">
      <Icon10 />
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[32px] relative shrink-0 w-[152px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button8 />
        <Button9 />
        <Container39 />
        <Button10 />
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="h-[64px] relative shrink-0 w-[1351px]" data-name="TopBar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[24px] relative size-full">
        <Container36 />
        <Container37 />
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute h-[126.853px] left-[9.54px] top-[40.99px] w-[271.192px]">
      <div className="absolute inset-[0_-0.65%_-0.38%_-0.65%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 274.731 127.341">
          <g id="Group 4">
            <path d="M1.76976 125.571H251.215" id="Line 7" stroke="var(--stroke-0, #D9D9DE)" strokeLinecap="round" strokeWidth="3.53952" />
            <path d="M265.286 125.571H272.962" id="Line 7_2" stroke="var(--stroke-0, #D9D9DE)" strokeLinecap="round" strokeWidth="3.53952" />
            <g id="Group 11">
              <rect fill="var(--fill-0, #F1F1F3)" height="12.8125" id="Rectangle 25" rx="1.76976" width="57.5643" x="18.3997" y="111.478" />
              <path d="M24.7957 117.884H43.9839" id="Line 5" stroke="var(--stroke-0, #D9D9DE)" strokeLinecap="round" strokeWidth="3.53952" />
              <g id="Group 9">
                <path d={svgPaths.p36666130} fill="var(--fill-0, #D9D9DE)" id="Path 14" />
                <path d={svgPaths.p3d23c600} fill="var(--fill-0, #D9D9DE)" id="Path 14_2" />
                <path d={svgPaths.p1e04f200} id="Path 17" stroke="var(--stroke-0, #F6F7F8)" strokeWidth="1.76976" />
                <path d={svgPaths.p19a595c0} id="Path 18" stroke="var(--stroke-0, #F6F7F8)" strokeWidth="1.76976" />
                <path clipRule="evenodd" d={svgPaths.p23c61080} fill="var(--fill-0, #F1F1F3)" fillRule="evenodd" id="Rectangle 3" />
                <path clipRule="evenodd" d={svgPaths.p1a17f980} fill="var(--fill-0, #D9D9DE)" fillRule="evenodd" id="Path 3" />
                <rect fill="var(--fill-0, #F1F1F3)" height="8.96875" id="Rectangle 3_2" rx="3.53952" width="37.097" x="31.192" y="84.5713" />
              </g>
            </g>
            <g id="Group 6">
              <path d={svgPaths.p676a100} id="Rectangle 29" stroke="var(--stroke-0, #D9D9DE)" strokeWidth="7.07903" />
              <path clipRule="evenodd" d={svgPaths.p25d2c100} fill="var(--fill-0, #F1F1F3)" fillRule="evenodd" id="Rectangle 26" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[33.313px] left-[34.54px] top-[23.06px] w-[88.265px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88.2654 33.3126">
        <g id="Frame 1000005182">
          <path clipRule="evenodd" d={svgPaths.p1f6c5e80} fill="var(--fill-0, #A4ADC5)" fillRule="evenodd" id="Rectangle 11" />
          <path clipRule="evenodd" d={svgPaths.p34da62f0} fill="var(--fill-0, #A4ADC5)" fillRule="evenodd" id="Rectangle 11_2" />
          <path clipRule="evenodd" d={svgPaths.p4fe8bf0} fill="var(--fill-0, #A4ADC5)" fillRule="evenodd" id="Rectangle 11_3" />
          <rect fill="var(--fill-0, #A4ADC5)" height="2.5625" id="Rectangle 11_4" width="48.636" x="0.0001263" y="30.7501" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute h-[89.687px] left-[64.55px] top-[99.94px] w-[157.342px]">
      <div className="absolute bg-[#dadada] inset-[0_10.57%_14.29%_10.57%] rounded-tl-[10.619px] rounded-tr-[10.619px]" />
      <div className="absolute bg-[rgba(125,134,160,0.8)] inset-[85.71%_0_0_0] rounded-bl-[176.976px] rounded-br-[176.976px]" />
      <Frame1 />
    </div>
  );
}

function Group3() {
  return (
    <div className="h-[256px] mix-blend-multiply relative shrink-0 w-[291px]">
      <div className="absolute h-[251.144px] left-0 top-[4.5px] w-[280.317px]" data-name="Path 35">
        <div className="absolute inset-[-0.7%_-0.63%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 283.857 254.683">
            <path clipRule="evenodd" d={svgPaths.p1c55dd00} fillRule="evenodd" id="Path 35" opacity="0.519475" stroke="var(--stroke-0, #F1F1F3)" strokeWidth="3.53952" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[58.222px] left-[27.45px] top-0 w-[49.888px]" data-name="Path 38">
        <div className="absolute inset-[-3.04%_-3.55%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53.4287 61.7614">
            <path clipRule="evenodd" d={svgPaths.pdf01c00} fillRule="evenodd" id="Path 38" opacity="0.519475" stroke="var(--stroke-0, #F1F1F3)" strokeWidth="3.53952" />
          </svg>
        </div>
      </div>
      <Group2 />
      <Frame2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-center justify-center pb-[96px] relative size-full">
          <Group3 />
          <p className="font-['Tisa_Pro:Light_Italic',sans-serif] italic leading-[normal] relative shrink-0 text-[#525a70] text-[20px] text-center whitespace-nowrap">You currently have no favorite projects yet.</p>
        </div>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="flex-[1_0_0] h-[972px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center overflow-clip relative rounded-[inherit] size-full">
        <TopBar />
        <Frame />
      </div>
    </div>
  );
}

export default function Bronte() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex items-start relative size-full" data-name="Bronte">
      <Sidebar />
      <Container35 />
    </div>
  );
}