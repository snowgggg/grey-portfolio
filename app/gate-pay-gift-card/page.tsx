import type { ReactNode } from "react";
import DecryptedText from "@/components/DecryptedText";
import MusicPlayer from "@/components/MusicPlayer";

const assets = {
  hero: "/assets/gatepay-gift-card/01.png",
  title: "/assets/gatepay-gift-card/05.png",
  occasions: "/assets/gatepay-gift-card/02.png",
  currencies: "/assets/gatepay-gift-card/03.png",
  process: "/assets/gatepay-gift-card/04.png",
};

const highlights = [
  "Provides a convenient process for creation, sharing, and redemption, lowering the barriers to use.",
  "Covers a wide range of gift card scenarios including holidays, brand collaborations, and promotional marketing.",
  "Leveraging the Gate ecosystem and security framework to ensure asset and transaction safety.",
];

const details = [
  ["Scope of Work", "Product research, brand design, user experience design."],
  ["Project Duration", "1 month."],
];

function Header() {
  return (
    <div className="px-[clamp(18px,3vw,44px)]">
      <header
        className="relative grid h-20 grid-cols-[1fr_auto_auto] items-center gap-x-[clamp(18px,3vw,46px)] font-[Aeonik] text-bone/[0.82] after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-bone/[0.12] after:content-[''] max-md:h-16"
        aria-label="Primary navigation"
      >
        <a className="link-underline loco-nav-link brand-link w-max" href="/" aria-label="Grey home" data-no-transition="true">
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

function TitleBlock() {
  return (
    <section className="relative h-[306px] w-full shrink-0 overflow-hidden bg-black">
      <CaseImage
        alt="Gift Card title graphic"
        className="h-full w-full object-cover object-left"
        src={assets.title}
      />
    </section>
  );
}

function CaseImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return <img alt={alt} className={["block", className].filter(Boolean).join(" ")} src={src} />;
}

function FeatureCard({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <section className="relative h-[752px] w-full overflow-hidden rounded-[15.273px] bg-[#1b1b1b]">
      <div className="absolute left-10 top-10 flex w-[calc(100%-80px)] flex-col gap-6">
        <h2 className="text-[38.182px] font-semibold leading-normal tracking-[-0.3818px] text-white">
          {title}
        </h2>
        <p className="text-[19.091px] font-light leading-[2] text-[#fff7e5]">
          {body}
        </p>
      </div>
      {children}
    </section>
  );
}

export default function GatePayGiftCardPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <main className="min-h-screen bg-black font-[Poppins] text-white">
        <div className="mx-auto w-full max-w-[1920px]">
          <Header />

          <div className="flex w-full flex-col gap-[120px] px-[120px] pb-[188px] pt-[100px] max-2xl:px-[6.25vw] max-lg:gap-20 max-lg:px-8 max-lg:py-16 max-md:px-5 max-md:py-10">
            <TitleBlock />

            <section className="flex h-[969px] w-full flex-col gap-10 max-lg:h-auto">
              <div className="flex w-full items-end justify-between gap-8 max-md:flex-col max-md:items-start">
                <div className="flex flex-col gap-2.5">
                  <h2 className="text-[56px] font-medium leading-normal text-white max-md:text-4xl">Gift Card</h2>
                  <p className="text-2xl font-medium leading-normal text-[#c3c3c3] max-md:text-lg">
                    Easily send, share, and redeem crypto gifts
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 text-right text-base font-light leading-normal text-[#c3c3c3] max-md:items-start max-md:text-left">
                  <span>Product, UX/UI</span>
                  <span>2025-2026</span>
                </div>
              </div>

              <div className="relative h-[800px] w-full shrink-0 overflow-hidden rounded-2xl bg-[#05f] max-lg:h-auto">
                <CaseImage
                  alt="Gift Card mobile product preview"
                  className="h-full w-full object-cover"
                  src={assets.hero}
                />
              </div>
            </section>

            <section className="flex w-full items-start justify-between gap-16 max-lg:flex-col">
              <div className="flex max-w-[1000px] flex-1 flex-col gap-12">
                <p className="text-[32px] font-medium leading-[1.6] text-white max-md:text-2xl">
                  The Gift Card is a digital gift card product from Gate, offering users around the world a convenient and flexible digital gifting experience.
                </p>
                <p className="text-base font-light leading-[1.6] text-[#bbb9ba]">
                  Supports various mainstream cryptocurrencies and diverse card formats, allowing users to quickly create, give, and redeem gift cards to meet various needs such as holiday greetings, social transfers, promotional marketing, and corporate rewards.
                </p>
                <div className="flex flex-col gap-5">
                  {highlights.map((item) => (
                    <div className="flex w-full items-center gap-4" key={item}>
                      <span className="h-8 w-1 shrink-0 bg-[#d3ff36]" />
                      <p className="flex-1 text-base font-light leading-[1.6] text-[#bbb9ba]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="flex w-[427px] flex-col gap-12 max-lg:w-full">
                {details.map(([label, value]) => (
                  <div className="flex w-full flex-col gap-3" key={label}>
                    <p className="text-base font-normal leading-[1.6] text-white">{label}</p>
                    <p className="text-sm font-light leading-[1.6] text-[#bbb9ba]">{value}</p>
                  </div>
                ))}
              </aside>
            </section>

            <section className="grid h-[752px] w-full grid-cols-2 gap-10 max-lg:h-auto max-lg:grid-cols-1">
              <FeatureCard
                title="Gift Cards for Every Occasion"
                body="From seasonal events and brand collaborations to campaign rewards, create engaging crypto gifting experiences for every moment."
              >
                <CaseImage
                  alt="Gift card occasion templates"
                  className="absolute left-10 top-[300px] h-auto w-[640px] object-contain"
                  src={assets.occasions}
                />
              </FeatureCard>

              <FeatureCard
                title="Support for Multiple Cryptocurrencies"
                body="Create and redeem gift cards seamlessly with a wide range of mainstream digital assets across the Gate ecosystem."
              >
                <CaseImage
                  alt="Supported cryptocurrency icons"
                  className="absolute left-10 top-[411px] h-[292.5px] w-[calc(100%-40px)] object-cover object-left"
                  src={assets.currencies}
                />
              </FeatureCard>
            </section>

            <section className="flex w-full flex-col items-center overflow-hidden rounded-2xl bg-[#1b1b1b] pt-20 max-md:pt-10">
              <div className="flex w-[1280px] max-w-full flex-col items-center px-8 text-center text-white max-md:px-5">
                <p className="w-full text-[32px] font-normal leading-[1.6] max-md:text-2xl">
                  Flexible crypto gifting for global users.
                </p>
                <h2 className="mt-5 w-full text-[54px] font-semibold leading-[1.3] max-md:text-3xl">
                  How might we create a seamless gifting experience across Web3 and digital payments?
                </h2>
              </div>
              <CaseImage
                alt="Gift Card product flow screens"
                className="mt-[100px] h-auto w-[calc(100%-280px)] max-w-[1400px] object-contain max-md:mt-12 max-md:w-[calc(100%-40px)]"
                src={assets.process}
              />
            </section>

            <section className="flex h-[76px] w-full flex-col gap-4 text-white">
              <h2 className="text-2xl font-medium leading-normal">
                Thank you for reviewing my case study！
              </h2>
              <p className="text-base font-light leading-[1.5]">
                You are welcome to explore my other work, experiments, and selected projects. For collaboration inquiries, please contact me at grey340611@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
