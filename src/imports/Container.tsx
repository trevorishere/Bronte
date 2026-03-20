import svgPaths from "./svg-7gq8jbrc3r";

function Icon() {
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

export default function Container() {
  return (
    <div className="bg-[#d58c6f] content-stretch flex items-center justify-center relative rounded-[8px] size-full" data-name="Container">
      <Icon />
    </div>
  );
}