import type { ReactNode } from "react";
import PortfolioHeader from "@/components/PortfolioHeader";

const assets = {
  hero: "/assets/font-design/01.png",
  precision: "/assets/font-design/02.png",
  numeralDetail: "/assets/font-design/03.png",
  tabularDetail: "/assets/font-design/04.png",
  symbolDetail: "/assets/font-design/05.png",
  comparisonGrid: "/assets/font-design/10.png",
  resultPhones: "/assets/font-design/12.png",
};

const details = [
  ["Scope", "Font research, brand design, type design"],
  ["Role", "Product, UX/UI"],
  ["Timeline", "2 weeks"],
];

const highlights = [
  "Optimized numeral structure and spacing to improve clarity at small sizes.",
  "Rebuilt common financial symbols to align with Gate's product language.",
  "Strengthened scanning efficiency for dense contract-trading data views.",
];

const principles = [
  {
    title: "High Recognition",
    body: "Financial interfaces rely on clean sans-serif numerals. The redesign keeps each figure legible, stable, and easy to distinguish in compact UI tables.",
    image: assets.numeralDetail,
    imageStyle: { width: 260, left: 40, bottom: 40 },
  },
  {
    title: "Tabular Numerals",
    body: "Every number shares a consistent horizontal rhythm, helping prices, percentages, and balances align cleanly across columns.",
    image: assets.tabularDetail,
    imageStyle: { width: 260, left: 40, bottom: 40 },
  },
  {
    title: "Financial Symbols",
    body: "Currency marks and trading operators such as $, €, %, +, -, /, and = were tuned for the same visual weight as the numerals.",
    image: assets.symbolDetail,
    imageStyle: { width: 260, left: 40, bottom: 40 },
  },
];

const comparisonRows = [
  ["Switzer", "1,234,567,890 / . $"],
  ["Gate_New", "1,234,567,890 / . $"],
  ["OKX", "1,234,567,890 / . $"],
  ["Coinbase", "1,234,567,890 / . $"],
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

function DarkPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={["overflow-hidden rounded-2xl bg-[#1b1b1b]", className].filter(Boolean).join(" ")}>
      {children}
    </section>
  );
}

export default function FontDesignPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <PortfolioHeader />

      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-[120px] px-[120px] pb-[188px] pt-[100px] max-2xl:px-[6.25vw] max-lg:gap-20 max-md:px-5 max-md:pt-10">
        <section className="flex flex-col gap-10">
          <div className="flex items-end justify-between gap-8 max-md:flex-col max-md:items-start">
            <div className="flex flex-col gap-2.5">
              <h1 className="text-[56px] font-medium leading-normal text-white max-md:text-4xl">
                Font Design
              </h1>
              <p className="max-w-[760px] text-2xl font-medium leading-normal text-[#c3c3c3] max-md:text-lg">
                Creating a clearer, steadier, and more modern financial numeral experience.
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 text-base font-light leading-normal text-[#c3c3c3] max-md:items-start">
              <span>Product, UX/UI</span>
              <span>2025</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-[#d3f36a]">
            <CaseImage src={assets.hero} alt="Gate Sans 5.0 hero typography visual" />
          </div>
        </section>

        <section className="grid grid-cols-[minmax(0,1000px)_300px] justify-between gap-16 max-2xl:grid-cols-[minmax(0,1fr)_300px] max-lg:grid-cols-1">
          <div className="flex max-w-[1000px] flex-col gap-12">
            <p className="text-[32px] font-medium leading-[1.6] text-white max-md:text-2xl">
              Gate Sans 5.0 is a type design upgrade focused on numerals, symbols, and financial characters for Gate's contract trading experience.
            </p>
            <div className="flex flex-col gap-6 text-xl font-light leading-[1.6] text-[#bbb9ba] max-md:text-base">
              <p>
                By redesigning the digits and financial marks in Switzer, the system improves readability and recognition in small-size, high-density trading scenarios.
              </p>
              <p>
                The work responds to fast-moving market data, price fluctuations, color-coded changes, and compact tables where every pixel affects decision speed.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              {highlights.map((item) => (
                <div className="flex items-center gap-4" key={item}>
                  <span className="h-8 w-1 shrink-0 bg-[#d3ff36]" />
                  <p className="text-xl font-light leading-[1.6] text-[#bbb9ba] max-md:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="flex flex-col gap-12">
            {details.map(([label, value]) => (
              <div className="flex flex-col gap-3" key={label}>
                <p className="text-base font-normal leading-[1.6] text-white">{label}</p>
                <p className="text-sm font-light leading-[1.6] text-[#bbb9ba]">{value}</p>
              </div>
            ))}
          </aside>
        </section>

        <DarkPanel className="px-[60px] py-20 max-lg:px-8 max-md:px-4 max-md:py-10">
          <div className="mx-auto flex max-w-[1560px] flex-col items-center gap-20 max-md:gap-10">
            <div className="max-w-[1280px] text-center text-white">
              <p className="text-[32px] font-normal leading-[1.6] max-md:text-2xl">
                Precision in Every Pixel
              </p>
              <h2 className="mt-5 text-[54px] font-semibold leading-[1.3] max-lg:text-4xl max-md:text-3xl">
                Refining numerals and financial symbols for clarity, rhythm, and readability in high-density trading interfaces.
              </h2>
            </div>
            <CaseImage
              src={assets.precision}
              alt="Gate Sans typography weights, language support, and numeral display"
              className="mx-auto max-w-[1560px]"
            />
          </div>
        </DarkPanel>

        <section className="grid grid-cols-3 gap-10 max-[1400px]:grid-cols-1">
          {principles.map((item) => (
            <DarkPanel className="relative h-[562px] px-10 py-10 max-md:h-auto max-md:min-h-[562px]" key={item.title}>
              <h2 className="text-[28px] font-semibold leading-normal tracking-normal text-white">
                {item.title}
              </h2>
              <p className="mt-2 text-lg font-light leading-[2] text-[#fff7e5]">
                {item.body}
              </p>
              <img
                alt={`${item.title} type design detail`}
                className="absolute max-w-[calc(100%-80px)] object-contain"
                src={item.image}
                style={item.imageStyle}
              />
            </DarkPanel>
          ))}
        </section>

        <section className="overflow-hidden rounded-2xl bg-[#95fa00]">
          <CaseImage
            src={assets.comparisonGrid}
            alt="Switzer and Gate Sans 5.0 numeral and symbol comparison grid"
          />
        </section>

        <DarkPanel className="px-[60px] py-20 max-lg:px-8 max-md:px-4 max-md:py-10">
          <div className="grid grid-cols-[minmax(0,520px)_1fr] gap-20 max-xl:grid-cols-1">
            <div>
              <h2 className="text-[40px] font-normal leading-normal text-white max-md:text-3xl">
                Result Presentation
              </h2>
              <div className="mt-16 flex flex-col gap-16 max-md:mt-10 max-md:gap-10">
                {comparisonRows.map(([label, sample]) => (
                  <div className="flex items-center gap-8 max-md:flex-col max-md:items-start max-md:gap-3" key={label}>
                    <span className={["flex w-[132px] shrink-0 justify-center px-3 py-2 text-xl font-semibold leading-normal text-black", label === "Gate_New" ? "bg-[#95fa00]" : "bg-white"].join(" ")}>
                      {label}
                    </span>
                    <span className="font-sans text-[38px] font-normal leading-none text-white tabular-nums max-md:text-[30px]">
                      {sample}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center overflow-hidden">
              <img
                alt="Gate old and new mobile trading typography comparison"
                className="w-full max-w-[803px] object-contain"
                src={assets.resultPhones}
              />
            </div>
          </div>
        </DarkPanel>

        <section className="flex flex-col gap-4 text-white">
          <h2 className="text-2xl font-medium leading-normal">
            Thank you for reviewing my case study.
          </h2>
          <p className="text-base font-light leading-[1.5] text-[#c3c3c3]">
            You are welcome to explore my other work, experiments, and selected projects. For collaboration inquiries, please contact me at grey340611@gmail.com.
          </p>
        </section>
      </div>
    </main>
  );
}
