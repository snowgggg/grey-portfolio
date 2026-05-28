import PortfolioHeader from "@/components/PortfolioHeader";

const assets = {
  hero: "/assets/gatepay-dashboard/1.png",
  revenue: "/assets/gatepay-dashboard/2.png",
  ux: "/assets/gatepay-dashboard/3.png",
  presentation: "/assets/gatepay-dashboard/4.png",
  collage: "/assets/gatepay-dashboard/5.png",
  filter: "/assets/gatepay-dashboard/6.png",
  details: "/assets/gatepay-dashboard/7.png",
  settings: "/assets/gatepay-dashboard/8.png",
  bills: "/assets/gatepay-dashboard/9.png",
};

const bullets = [
  "Lower transaction costs create more room for merchant revenue.",
  "More than ten years of technical infrastructure protects assets with proof of reserves.",
  "Global digital asset licenses support compliant business operations.",
];

function CaseImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return <img alt={alt} className={["block h-auto w-full", className].filter(Boolean).join(" ")} src={src} />;
}

export default function GatePayDashboardPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <main className="min-h-screen bg-black font-[Poppins] text-white">
        <PortfolioHeader />
        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-[120px] px-[120px] pb-[188px] pt-[100px] max-2xl:px-[6.25vw] max-lg:gap-20 max-lg:px-8 max-lg:py-16 max-md:px-5 max-md:py-10">
          <section className="flex flex-col gap-10">
            <div className="flex items-end justify-between gap-8 max-md:flex-col max-md:items-start">
              <div className="max-w-[1020px]">
                <h1 className="text-[56px] font-medium leading-[1.48] text-white max-md:text-4xl">
                  Gate Pay Merchant Dashboard
                </h1>
                <p className="mt-2.5 text-2xl font-medium leading-normal text-[#c3c3c3] max-md:text-lg">
                  Secure, compliant crypto payment collection, payouts, digital assets, and global fiat asset management in one platform.
                </p>
              </div>
              <div className="shrink-0 text-right text-base font-light leading-[1.6] text-[#c3c3c3] max-md:text-left">
                Product, UX/UI
                <br />
                2025-2026
              </div>
            </div>
            <div className="h-[800px] overflow-hidden rounded-2xl bg-[#05f] max-lg:h-auto">
              <CaseImage alt="Gate Pay dashboard hero screen" className="h-full object-cover" src={assets.hero} />
            </div>
          </section>

          <section className="grid grid-cols-[minmax(0,1000px)_427px] justify-between gap-16 max-lg:grid-cols-1">
            <div>
              <p className="text-[32px] font-medium leading-[1.6] text-white max-md:text-2xl">
                An integrated Web3 payment product suite for global merchants.
              </p>
              <p className="mt-12 text-xl font-light leading-[1.6] text-[#bbb9ba] max-md:text-base">
                Gate Pay helps businesses connect to global crypto payment scenarios, process digital asset transactions, accept Bitcoin, USDT, and 300+ mainstream cryptocurrencies, and settle in stablecoins or fiat with a secure and reliable merchant experience.
              </p>
              <div className="mt-12 flex flex-col gap-5">
                {bullets.map((item) => (
                  <div className="flex items-center gap-4" key={item}>
                    <span className="h-8 w-1 shrink-0 bg-[#d3ff36]" />
                    <p className="text-xl font-light leading-[1.6] text-[#bbb9ba] max-md:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <aside className="flex flex-col gap-12">
              <div>
                <h2 className="mb-3 text-base font-normal leading-[1.6] text-white">Scope</h2>
                <p className="text-sm font-light leading-[1.6] text-[#bbb9ba]">
                  Product research, brand design, component design, user experience design
                </p>
              </div>
              <div>
                <h2 className="mb-3 text-base font-normal leading-[1.6] text-white">Website</h2>
                <a className="break-all text-sm font-light leading-[1.6] text-[#d3ff36]" href="https://www.gate.com/en/pay" rel="noreferrer" target="_blank">
                  https://www.gate.com/en/pay
                </a>
              </div>
              <div>
                <h2 className="mb-3 text-base font-normal leading-[1.6] text-white">Timeline</h2>
                <p className="text-sm font-light leading-[1.6] text-[#bbb9ba]">2 months</p>
              </div>
            </aside>
          </section>

          <div className="grid grid-cols-2 gap-10 max-lg:grid-cols-1">
            <section className="relative min-h-[752px] overflow-hidden rounded-2xl bg-[#1b1b1b] p-10 max-md:min-h-[560px] max-md:p-7">
              <h2 className="text-[38px] font-semibold leading-[1.3] text-white max-md:text-[28px]">
                Designing Gate Pay
              </h2>
              <p className="mt-2 text-[19px] font-light leading-[2] text-[#fff7e5] max-md:text-base">
                A behind-the-scenes look at the strategy, process, and design decisions behind Gate Pay.
              </p>
              <div className="absolute bottom-0 left-10 right-0 h-[466px] overflow-hidden max-md:left-7">
                <CaseImage alt="Gate Merchant Revenue modal" className="h-full w-[790px] max-w-none object-cover object-left-top" src={assets.revenue} />
              </div>
            </section>
            <section className="flex min-h-[752px] flex-col overflow-hidden rounded-2xl bg-[#1b1b1b] p-10 max-md:min-h-[520px] max-md:p-7">
              <h2 className="text-[38px] font-semibold leading-[1.3] text-white max-md:text-[28px]">
                Connect with a Massive Web3 User Base
              </h2>
              <p className="mt-2 text-[19px] font-light leading-[2] text-[#fff7e5] max-md:text-base">
                Enabling seamless, low-cost transfers and payments using Gate account balances.
              </p>
              <div className="flex-1" />
              <p className="whitespace-nowrap font-[Aeonik] text-[clamp(48px,5.2vw,100px)] font-bold leading-none text-white">
                40,000,000
              </p>
              <p className="mt-6 text-[19px] font-light leading-[2] text-white max-md:text-base">
                Gate Pay supports over 40 million Web3 users across the Gate ecosystem
              </p>
            </section>
          </div>

          <section className="overflow-hidden rounded-2xl bg-[#05f] px-16 pt-16 max-md:px-7 max-md:pt-7">
            <h2 className="text-[64px] font-bold leading-[1.5] text-white max-md:text-4xl">
              User experience design
              <br />
              Should not live without real user.
            </h2>
            <div className="mt-16 overflow-hidden rounded-t-2xl max-md:mt-10">
              <CaseImage alt="Gate Pay dashboard user experience screens" src={assets.ux} />
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl bg-[#05f]">
            <CaseImage alt="Gate Pay dashboard secondary page presentation" src={assets.presentation} />
          </section>

          <section className="overflow-hidden rounded-2xl bg-[#1b1b1b] px-[100px] pt-[100px] max-lg:px-12 max-md:px-7 max-md:pt-12">
            <div className="overflow-hidden rounded-t-2xl bg-white shadow-[0_0_40px_#000]">
              <CaseImage alt="Gate Pay dashboard full page presentation" src={assets.collage} />
            </div>
          </section>

          <div className="grid grid-cols-2 gap-10 max-lg:grid-cols-1">
            <section className="flex min-h-[476px] items-center justify-center overflow-hidden rounded-2xl bg-[#1b1b1b] px-[60px] py-10 max-md:min-h-0 max-md:px-7">
              <CaseImage alt="Gate Pay dashboard filter component module" className="max-h-[301px] w-[min(100%,700px)] object-contain" src={assets.filter} />
            </section>
            <section className="flex min-h-[476px] items-center justify-center overflow-hidden rounded-2xl bg-[#1b1b1b] px-[60px] py-10 max-md:min-h-0 max-md:px-7">
              <CaseImage alt="Gate Pay dashboard order details module" className="max-h-full object-contain" src={assets.details} />
            </section>
          </div>

          <div className="grid grid-cols-2 gap-10 max-lg:grid-cols-1">
            <section className="flex min-h-[476px] items-center justify-center overflow-hidden rounded-2xl bg-[#1b1b1b] px-[60px] py-10 max-md:min-h-0 max-md:px-7">
              <CaseImage alt="Payment link and button settings modals" className="max-h-full object-contain" src={assets.settings} />
            </section>
            <section className="flex min-h-[476px] items-center justify-center overflow-hidden rounded-2xl bg-[#1b1b1b] px-[60px] py-10 max-md:min-h-0 max-md:px-7">
              <CaseImage alt="Gate Pay bill management page" className="max-h-full object-contain" src={assets.bills} />
            </section>
          </div>

          <section className="text-white">
            <h2 className="text-2xl font-medium leading-normal">Thank you for reviewing my case study.</h2>
            <p className="mt-4 text-base font-light leading-[1.5]">
              You are welcome to explore my other work, experiments, and selected projects. For collaboration inquiries, please contact me at grey340611@gmail.com.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
