import svgPaths from "./svg-7hqrzy164w";
import { imgVector } from "./svg-f2zyy";

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
    <div className="h-[40px] relative rounded-[12px] shrink-0 w-[271px]" data-name="Button">
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
    <div className="bg-[#ececec] flex-[1_0_0] min-h-px min-w-px relative rounded-[12px] w-[271px]" data-name="Button">
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
    <div className="bg-[#fbfaf9] content-stretch flex flex-col h-[1172px] items-start pr-px relative shrink-0 w-[296px]" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[#d0d0d0] border-r border-solid inset-0 pointer-events-none" />
      <Container />
      <Container6 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#323232] text-[20px] tracking-[0.2px] whitespace-nowrap">Admin</p>
    </div>
  );
}

function Icon8() {
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

function Button8() {
  return (
    <div className="content-stretch flex items-center justify-center px-[11px] relative rounded-[20px] shrink-0 size-[32px]" data-name="Button">
      <Icon8 />
    </div>
  );
}

function Icon9() {
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

function Button9() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[32px]" data-name="Button">
      <Icon9 />
    </div>
  );
}

function Icon10() {
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

function Button10() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[32px]" data-name="Button">
      <Icon10 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="bg-[#934790] content-stretch flex flex-col h-full items-center justify-center overflow-clip relative rounded-[24px] shrink-0 w-[32px]" data-name="Icon">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[13px] text-center text-white tracking-[0.13px] whitespace-nowrap">LD</p>
    </div>
  );
}

function ActionButtonsFrame() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Action Buttons Frame">
      <Button8 />
      <Button9 />
      <Button10 />
      <div className="flex flex-row items-center self-stretch">
        <Icon11 />
      </div>
    </div>
  );
}

function ContentHeaderFrame() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Content Header Frame">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] relative size-full">
          <Container35 />
          <ActionButtonsFrame />
        </div>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#323232] border-b-3 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[19px] px-[16px] relative">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#323232] text-[15px] tracking-[0.15px] whitespace-nowrap">Projects</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start pb-[18px] px-[16px] relative">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#525a70] text-[15px] tracking-[0.15px] whitespace-nowrap">Accounts</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[18px] px-[16px] relative">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#525a70] text-[15px] tracking-[0.15px] whitespace-nowrap">Teams</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[18px] px-[16px] relative">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#525a70] text-[15px] tracking-[0.15px] whitespace-nowrap">Workspaces</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex items-start pt-[16px] relative shrink-0 w-full" data-name="Container">
      <Container38 />
      <Container39 />
      <Container40 />
      <Container41 />
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#cecece] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-end size-full">
        <div className="content-stretch flex flex-col items-start justify-end px-[24px] relative size-full">
          <Container37 />
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[20px] items-center min-h-px min-w-px relative" data-name="Text">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#636c85] text-[14px] w-[45px]">
        <p className="leading-[normal]">Owner</p>
      </div>
    </div>
  );
}

function Icon12() {
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

function Text1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[4px] relative shrink-0 size-[20px]" data-name="Text">
      <Icon12 />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between pl-[16px] pr-[12px] relative rounded-[16px] shrink-0 w-[240px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Text />
      <Text1 />
    </div>
  );
}

function Text2() {
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

function Icon13() {
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

function Text3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[4px] relative size-full">
        <Icon13 />
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between pl-[17px] pr-[13px] py-px relative rounded-[16px] shrink-0 w-[240px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Text2 />
      <Text3 />
    </div>
  );
}

function Container43() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <Container44 />
        <Container45 />
      </div>
    </div>
  );
}

function Icon14() {
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

function Button11() {
  return (
    <div className="bg-white relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 size-[36px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#cecece] border-r border-solid inset-0 pointer-events-none rounded-bl-[8px] rounded-tl-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[8px] pr-[9px] relative size-full">
        <Icon14 />
      </div>
    </div>
  );
}

function Icon15() {
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

function Button12() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[9px] relative size-full">
        <Icon15 />
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="relative rounded-[8px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center p-px relative">
        <Button11 />
        <Button12 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[36px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] h-full items-center relative">
        <Container47 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[24px] pr-[48px] py-[32px] relative w-full">
          <Container43 />
          <Container46 />
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

function Container50() {
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
      <Container50 />
    </div>
  );
}

function Icon16() {
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
        <Icon16 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[21px] relative shrink-0 w-[379.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">{`Anatomy & Physiology: The Unity of Forzm and Function`}</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container52 />
      <Text4 />
    </div>
  );
}

function TableCell() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[20px] py-[16px] relative size-full">
          <Container51 />
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

function Icon17() {
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

function Button13() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon17 />
    </div>
  );
}

function Icon18() {
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

function Button14() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon18 />
    </div>
  );
}

function TableCell3() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button13 />
      <Button14 />
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

function Icon19() {
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
        <Icon19 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Biochemistry, 9th Edition</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container54 />
      <Text5 />
    </div>
  );
}

function TableCell4() {
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

function Icon20() {
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

function Button15() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon20 />
    </div>
  );
}

function Icon21() {
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

function Button16() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon21 />
    </div>
  );
}

function TableCell7() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button15 />
      <Button16 />
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

function Icon22() {
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
        <Icon22 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Microbiology: An Introduction, 13th Edition</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container56 />
      <Text6 />
    </div>
  );
}

function TableCell8() {
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

function Icon23() {
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

function Button17() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon23 />
    </div>
  );
}

function Icon24() {
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

function Button18() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon24 />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button17 />
      <Button18 />
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

function Icon25() {
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
        <Icon25 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Fundamentals of Differential Equations, 9th Edition</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container58 />
      <Text7 />
    </div>
  );
}

function TableCell12() {
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

function Icon26() {
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

function Button19() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon26 />
    </div>
  );
}

function Icon27() {
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

function Button20() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon27 />
    </div>
  );
}

function TableCell15() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button19 />
      <Button20 />
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

function Icon28() {
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
        <Icon28 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Precalculus, 11th Edition</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container60 />
      <Text8 />
    </div>
  );
}

function TableCell16() {
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

function Icon29() {
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

function Button21() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon29 />
    </div>
  );
}

function Icon30() {
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

function Button22() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon30 />
    </div>
  );
}

function TableCell19() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button21 />
      <Button22 />
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

function Icon31() {
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
        <Icon31 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Calculus, 14th Edition</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container62 />
      <Text9 />
    </div>
  );
}

function TableCell20() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container61 />
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

function Icon32() {
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

function Button23() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon32 />
    </div>
  );
}

function Icon33() {
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

function Button24() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon33 />
    </div>
  );
}

function TableCell23() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button23 />
      <Button24 />
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

function Icon34() {
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

function Container64() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon34 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Organic Chemistry, 10th Edition</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container64 />
      <Text10 />
    </div>
  );
}

function TableCell24() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container63 />
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

function Icon35() {
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

function Button25() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon35 />
    </div>
  );
}

function Icon36() {
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

function Button26() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon36 />
    </div>
  );
}

function TableCell27() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button25 />
      <Button26 />
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

function Icon37() {
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

function Container66() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon37 />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Physics for Scientists and Engineers, 4th Edition</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container66 />
      <Text11 />
    </div>
  );
}

function TableCell28() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container65 />
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

function Icon38() {
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

function Button27() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon38 />
    </div>
  );
}

function Icon39() {
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

function Button28() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon39 />
    </div>
  );
}

function TableCell31() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button27 />
      <Button28 />
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

function Icon40() {
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

function Container68() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon40 />
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">General Chemistry, 11th Edition</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container68 />
      <Text12 />
    </div>
  );
}

function TableCell32() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container67 />
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

function Icon41() {
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

function Button29() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon41 />
    </div>
  );
}

function Icon42() {
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

function Button30() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon42 />
    </div>
  );
}

function TableCell35() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button29 />
      <Button30 />
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

function Icon43() {
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

function Container70() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon43 />
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Essential Cell Biology, 5th Edition</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container70 />
      <Text13 />
    </div>
  );
}

function TableCell36() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container69 />
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

function Icon44() {
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

function Button31() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon44 />
    </div>
  );
}

function Icon45() {
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

function Button32() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon45 />
    </div>
  );
}

function TableCell39() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button31 />
      <Button32 />
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

function Icon46() {
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

function Container72() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon46 />
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Principles of Genetics, 8th Edition</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container72 />
      <Text14 />
    </div>
  );
}

function TableCell40() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container71 />
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

function Icon47() {
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

function Button33() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon47 />
    </div>
  );
}

function Icon48() {
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

function Button34() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon48 />
    </div>
  );
}

function TableCell43() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button33 />
      <Button34 />
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

function Icon49() {
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

function Container74() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon49 />
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">{`Human Anatomy & Physiology, 11th Edition`}</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container74 />
      <Text15 />
    </div>
  );
}

function TableCell44() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container73 />
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

function Icon50() {
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

function Button35() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon50 />
    </div>
  );
}

function Icon51() {
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

function Button36() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon51 />
    </div>
  );
}

function TableCell47() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button35 />
      <Button36 />
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

function Icon52() {
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

function Container76() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon52 />
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Introduction to Chemical Engineering, 8th Edition</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container76 />
      <Text16 />
    </div>
  );
}

function TableCell48() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[702px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container75 />
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

function Icon53() {
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

function Button37() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon53 />
    </div>
  );
}

function Icon54() {
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

function Button38() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9px] relative rounded-[6px] shrink-0 size-[40px]" data-name="Button">
      <Icon54 />
    </div>
  );
}

function TableCell51() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end overflow-clip px-[20px] relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Table Cell">
      <Button37 />
      <Button38 />
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

function Icon55() {
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

function Container78() {
  return (
    <div className="bg-[#d58c6f] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon55 />
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[21px] relative shrink-0 w-[279.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#636c85] text-[14px] top-0 tracking-[0.14px] whitespace-nowrap">Molecular Biology of the Cell, 7th Edition</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container78 />
      <Text17 />
    </div>
  );
}

function TableCell52() {
  return (
    <div className="h-full relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-[713px]" data-name="Table Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Container77 />
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

function Container49() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Table />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[32px] relative size-full">
          <Container49 />
        </div>
      </div>
    </div>
  );
}

function ContentBodyFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="Content Body Frame">
      <Container36 />
      <Container42 />
      <Container48 />
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
    <div className="absolute content-stretch flex h-[1172px] items-start left-0 top-0 w-[1786px]" data-name="Main Frame">
      <Sidebar />
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