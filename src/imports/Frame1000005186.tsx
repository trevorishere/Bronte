function Admin() {
  return (
    <div className="absolute bg-[rgba(147,71,144,0.2)] content-stretch flex gap-[4px] items-center left-[28px] pb-[5px] pt-[4px] px-[16px] rounded-[16px] top-[54px]" data-name="admin">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#934790] text-[14px] tracking-[0.14px] whitespace-nowrap">
        <p className="leading-[normal]">Admin</p>
      </div>
    </div>
  );
}

function Owner() {
  return (
    <div className="absolute bg-[rgba(118,105,170,0.2)] content-stretch flex gap-[4px] items-center left-[28px] pb-[5px] pt-[4px] px-[16px] rounded-[16px] top-[98px]" data-name="owner">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#7669aa] text-[14px] tracking-[0.14px] whitespace-nowrap">
        <p className="leading-[normal]">Owner</p>
      </div>
    </div>
  );
}

function Manager() {
  return (
    <div className="absolute bg-[rgba(172,78,79,0.2)] content-stretch flex gap-[4px] h-[30px] items-center justify-center left-[28px] pb-[5px] pt-[4px] px-[16px] rounded-[16px] top-[142px]" data-name="manager">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#ac4e4f] text-[14px] tracking-[0.14px] whitespace-nowrap">
        <p className="leading-[normal]">Manager</p>
      </div>
    </div>
  );
}

function Creator() {
  return (
    <div className="absolute bg-[rgba(81,101,181,0.2)] content-stretch flex gap-[4px] items-center justify-center left-[28px] pb-[5px] pt-[4px] px-[16px] rounded-[16px] top-[186px]" data-name="creator">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#5165b5] text-[14px] tracking-[0.14px] whitespace-nowrap">
        <p className="leading-[normal]">Creator</p>
      </div>
    </div>
  );
}

function Viewer() {
  return (
    <div className="absolute bg-[rgba(75,143,108,0.2)] content-stretch flex gap-[4px] items-center justify-center left-[28px] pb-[5px] pt-[4px] px-[16px] rounded-[16px] top-[230px]" data-name="viewer">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4b8f6c] text-[14px] tracking-[0.14px] whitespace-nowrap">
        <p className="leading-[normal]">Viewer</p>
      </div>
    </div>
  );
}

function Member() {
  return (
    <div className="absolute bg-[rgba(172,148,69,0.2)] content-stretch flex gap-[4px] items-center left-[28px] pb-[5px] pt-[4px] px-[16px] rounded-[16px] top-[274px]" data-name="member">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#ac9445] text-[14px] tracking-[0.14px] whitespace-nowrap">
        <p className="leading-[normal]">Member</p>
      </div>
    </div>
  );
}

function Developer() {
  return (
    <div className="absolute bg-[rgba(185,121,48,0.2)] content-stretch flex gap-[4px] items-center left-[28px] pb-[5px] pt-[4px] px-[16px] rounded-[16px] top-[318px]" data-name="developer">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#b97930] text-[14px] tracking-[0.14px] whitespace-nowrap">
        <p className="leading-[normal]">Developer</p>
      </div>
    </div>
  );
}

function Owner1() {
  return (
    <div className="absolute bg-[rgba(57,134,156,0.1)] content-stretch flex gap-[4px] items-center left-[28px] pb-[5px] pt-[4px] px-[16px] rounded-[16px] top-[362px]" data-name="owner">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#39869c] text-[14px] tracking-[0.14px] whitespace-nowrap">
        <p className="leading-[normal]">Editor</p>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <Admin />
      <Owner />
      <Manager />
      <Creator />
      <Viewer />
      <Member />
      <Developer />
      <Owner1 />
    </div>
  );
}