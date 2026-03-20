import svgPaths from "./svg-clqxo0br2l";

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p20002280} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2963" />
          <path d={svgPaths.p3d4fd280} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2963" />
          <path d={svgPaths.p3bd098a0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2963" />
          <path d={svgPaths.p31af4540} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2963" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-1/2 size-[28px] top-1/2" data-name="Container">
      <Icon />
    </div>
  );
}

export default function AvatarEmpty() {
  return (
    <div className="bg-[#966fae] relative rounded-[28px] size-full" data-name="Avatar/Empty">
      <Container />
    </div>
  );
}