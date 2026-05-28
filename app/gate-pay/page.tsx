import type { ReactNode } from "react";
import DecryptedText from "@/components/DecryptedText";
import MusicPlayer from "@/components/MusicPlayer";

const assets = {
  hero: "/assets/gatepay-website/1.png",
  longPage: "/assets/gatepay-website/2.png",
  secondaryPages: "/assets/gatepay-website/3.png",
  process: "/assets/gatepay-website/4.png",
  iconSystem: "/assets/gatepay-website/5.png",
  dashboard: "/assets/gatepay-website/6.png",
  logoGrid: "/assets/gatepay-website/7.png",
  styleOne: [
    "/assets/gatepay-website/card1_01.png",
    "/assets/gatepay-website/card1_02.png",
    "/assets/gatepay-website/card1_03.png",
    "/assets/gatepay-website/card1_04.png",
    "/assets/gatepay-website/card1_05.png",
    "/assets/gatepay-website/card1_06.png",
    "/assets/gatepay-website/card1_07.png",
    "/assets/gatepay-website/card1_08.png",
  ],
  styleTwo: [
    "/assets/gatepay-website/card2_01.png",
    "/assets/gatepay-website/card2_02.png",
    "/assets/gatepay-website/card2_03.png",
    "/assets/gatepay-website/card2_04.png",
    "/assets/gatepay-website/card2_05.png",
    "/assets/gatepay-website/card2_06.png",
    "/assets/gatepay-website/card2_07.png",
    "/assets/gatepay-website/card2_08.png",
    "/assets/gatepay-website/card2_09.png",
    "/assets/gatepay-website/card2_10.png",
    "/assets/gatepay-website/card2_11.png",
    "/assets/gatepay-website/card2_12.png",
    "/assets/gatepay-website/card2_13.png",
    "/assets/gatepay-website/card2_14.png",
    "/assets/gatepay-website/card2_15.png",
    "/assets/gatepay-website/card2_16.png",
  ],
};

const details = [
  ["Scope", "Product research, brand design, user experience design"],
  ["Website", "https://www.gate.com/en/pay"],
  ["Timeline", "1 month"],
];

function Header() {
  return (
    <div className="overflow-hidden px-[clamp(18px,3vw,44px)]">
      <header
        className="relative grid h-20 grid-cols-[1fr_auto_auto] items-center gap-x-[clamp(18px,3vw,46px)] text-bone/[0.82] after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-bone/[0.12] after:content-[''] max-md:h-16"
        aria-label="Primary navigation"
      >
        <a
          className="link-underline loco-nav-link brand-link w-max"
          href="/"
          aria-label="Grey home"
          data-no-transition="true"
          data-transition="none"
        >
          <DecryptedText
            text="@GREY DESIGN PORTFOLIO"
            speed={34}
            maxIterations={12}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@/#$%&"
            className="text-bone/[0.82]"
            encryptedClassName="text-mint"
            parentClassName="decrypt-brand"
            animateOn="hover"
          />
        </a>
        <nav className="flex items-center justify-end gap-[clamp(18px,3vw,46px)]">
          <a className="link-underline loco-nav-link" href="/#work">
            Work
          </a>
          <a className="link-underline loco-nav-link" href="/about">
            About
          </a>
        </nav>
        <MusicPlayer />
      </header>
    </div>
  );
}

function ImageBlock({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return <img src={src} alt={alt} className={["block h-auto w-full", className].filter(Boolean).join(" ")} />;
}

function DetailItem({ label, value }: { label: string; value: string }) {
  const isLink = value.startsWith("https://");

  return (
    <div className="flex flex-col gap-3">
      <p className="text-base font-normal leading-[1.6] text-white">{label}</p>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="break-all text-sm font-light leading-[1.6] text-[#d3ff36]"
        >
          {value}
        </a>
      ) : (
        <p className="text-sm font-light leading-[1.6] text-[#bbb9ba]">{value}</p>
      )}
    </div>
  );
}

function ShowcaseSection({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={["overflow-hidden rounded-2xl bg-[#1b1b1b]", className].filter(Boolean).join(" ")}>
      <div className="p-20 max-lg:px-[6vw] max-lg:py-12">
        {title ? (
          <p className="mb-6 text-xl font-light leading-[2] text-[#fff7e5] max-md:text-base">{title}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

function CardGrid({ images, title }: { images: string[]; title: string }) {
  return (
    <section className="overflow-hidden rounded-2xl bg-[#1b1b1b]">
      <p className="px-20 pt-20 text-xl font-light leading-[2] text-[#fff7e5] max-lg:px-[6vw] max-lg:pt-12 max-md:text-base">
        {title}
      </p>
      <div className="grid grid-cols-4 gap-6 px-20 pb-20 pt-6 max-lg:grid-cols-2 max-lg:px-[6vw] max-lg:pb-12 max-md:grid-cols-1">
        {images.map((src) => (
          <ImageBlock
            key={src}
            src={src}
            alt={title}
            className="rounded-[10px] transition duration-500 ease-out hover:relative hover:z-10 hover:scale-[1.04] hover:shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
          />
        ))}
      </div>
    </section>
  );
}

export default function GatePayPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-[120px] px-[120px] pb-[188px] pt-[100px] max-lg:gap-20 max-lg:px-[6vw] max-lg:py-16 max-md:gap-16 max-md:px-5 max-md:py-10">
        <section className="flex flex-col gap-10">
          <div className="flex items-end justify-between gap-8 max-md:flex-col max-md:items-start">
            <div>
              <h1 className="m-0 text-[56px] font-medium leading-[1.48] text-white max-md:text-[40px]">
                Gate Pay
              </h1>
              <p className="m-0 text-2xl font-medium text-[#c3c3c3] max-md:text-lg">
                Building the next-generation payment engine for global businesses
              </p>
            </div>
            <div className="text-right text-base font-light leading-[1.6] text-[#c3c3c3] max-md:text-left">
              Product, UX/UI
              <br />
              2025-2026
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl bg-[#0055ff]">
            <ImageBlock src={assets.hero} alt="Gate Pay hero" />
          </div>
        </section>

        <section className="grid grid-cols-[minmax(0,1000px)_300px] justify-between gap-16 max-lg:grid-cols-1">
          <div>
            <p className="m-0 text-[32px] font-medium leading-[1.6] text-white max-md:text-2xl">
              Gate Pay is Gate&apos;s cryptocurrency payment solution, built to provide secure, convenient, and low-cost crypto
              payments for users and merchants around the world.
            </p>
            <div className="mt-12 flex flex-col gap-6 text-base font-light leading-[1.6] text-[#bbb9ba]">
              <p>
                Through advanced blockchain technology and payment infrastructure, Gate Pay supports major digital assets, helps
                merchants reduce transaction costs, improves settlement efficiency, and gives users more flexible ways to pay.
              </p>
              <p>
                Looking ahead, Gate Pay will continue expanding a global payment ecosystem that connects more merchants and users
                across the digital economy.
              </p>
            </div>
            <div className="mt-12 flex flex-col gap-5">
              {[
                "Supports major cryptocurrencies across different payment scenarios.",
                "Provides merchants with a low-code, high-efficiency collection and settlement solution.",
                "Connects with Gate ecosystem resources while keeping transactions secure and compliant.",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 text-base font-light leading-[1.6] text-[#bbb9ba]">
                  <span className="h-8 w-1 shrink-0 bg-[#d3ff36]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="flex flex-col gap-12">
            {details.map(([label, value]) => (
              <DetailItem key={label} label={label} value={value} />
            ))}
          </aside>
        </section>

        <section className="flex flex-col items-center gap-20 overflow-hidden rounded-2xl bg-[#1b1b1b] px-[200px] py-20 max-lg:px-[6vw] max-lg:py-12">
          <div className="max-w-[1280px] text-center">
            <p className="mb-5 text-[32px] leading-[1.6] text-white max-md:text-2xl">
              Secure crypto payments for global businesses.
            </p>
            <h2 className="m-0 text-5xl font-bold leading-[1.3] text-white max-md:text-[32px]">
              How might we build a seamless payment experience for businesses worldwide?
            </h2>
          </div>
          <div className="w-full max-w-[1000px] overflow-hidden rounded-2xl">
            <ImageBlock src={assets.longPage} alt="Website long page" />
          </div>
        </section>

        <ShowcaseSection title="Secondary Page Presentation">
          <ImageBlock src={assets.secondaryPages} alt="Secondary pages" />
        </ShowcaseSection>

        <div className="grid grid-cols-2 items-stretch gap-[38px] max-lg:grid-cols-1">
          <section className="flex min-h-[520px] flex-col justify-between overflow-hidden rounded-2xl bg-[#0055ff] px-10 pb-0 pt-10 max-md:min-h-[460px] max-md:px-5">
            <div className="max-w-[700px] text-white">
              <h2 className="m-0 text-[32px] font-semibold leading-[1.25] max-md:text-2xl">Designing Gate Pay</h2>
              <p className="mt-4 text-base font-normal leading-[1.5] max-md:text-sm">
                A behind-the-scenes look at the strategy, process, and design decisions behind Gate Pay.
              </p>
            </div>
            <ImageBlock src={assets.process} alt="Gate Pay design process interface" className="mx-auto mt-6 w-[86%] max-w-[680px]" />
          </section>

          <section className="flex min-h-[520px] items-center overflow-hidden rounded-2xl bg-[#1b1b1b] p-[60px] max-md:min-h-[460px] max-md:px-5">
            <ImageBlock src={assets.iconSystem} alt="Gate Pay icon system" className="mx-auto max-w-[700px]" />
          </section>
        </div>

        <ShowcaseSection title="Dashboard Visual System">
          <ImageBlock src={assets.dashboard} alt="Dashboard visual" />
        </ShowcaseSection>

        <section className="overflow-hidden rounded-2xl bg-[#0055ff]">
          <ImageBlock src={assets.logoGrid} alt="Gate Pay logo construction grid" />
        </section>

        <CardGrid title="Product Feature Illustrations - Style 1" images={assets.styleOne} />
        <CardGrid title="Product Feature Illustrations - Style 2" images={assets.styleTwo} />

        <section className="text-white">
          <h2 className="m-0 text-2xl font-medium">Thank you for reviewing my case study.</h2>
          <p className="mt-4 text-base font-light leading-[1.5] text-[#d8d8d8]">
            You are welcome to explore my other work, experiments, and selected projects. For collaboration inquiries, please
            contact me at grey340611@gmail.com.
          </p>
        </section>
      </div>
    </main>
  );
}
