import type { ReactNode } from "react";
import DecryptedText from "@/components/DecryptedText";
import MusicPlayer from "@/components/MusicPlayer";

const assets = {
  titleStrip: "/assets/gatepay-video/00.png",
  hero: "/assets/gatepay-video/01.png",
  plot: "/assets/gatepay-video/02.png",
  storyboard: "/assets/gatepay-video/03.png",
  finalVideo: "/assets/gatepay-video/gate-pay-final.mov",
};

const details = [
  ["Scope", "Script design, AI storyboard, AI video creation"],
  ["Watch link", "https://www.yuque.com/u48984516/ktobpr/narq1xvloy4mto6c/edit"],
  ["Timeline", "1 month"],
];

const roleSettings = [
  'Character A: young male digital entrepreneur, Asian face. Prompt: "Asian young adult male, tech entrepreneur style, confident expression, wearing smart casual outfit, studio lighting --v 7 --style raw"',
  'Character B: female freelancer, Western face. Prompt: "White female freelancer, working on laptop at cafe, casual chic outfit, natural light --v 7 --style raw"',
];

const productionSettings = [
  "Duration: 60s",
  "Visual style: futuristic intelligent scenes with a tech-realistic look, combining user scenarios, intelligent UI motion, and a clean bright background.",
  "Music / rhythm: electronic synth with progressive drums, matched to camera transitions to express product professionalism and a future-facing tone.",
];

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

function Header() {
  return (
    <div className="px-[clamp(18px,3vw,44px)]">
      <header
        className="relative grid h-20 grid-cols-[1fr_auto_auto] items-center gap-x-[clamp(18px,3vw,46px)] font-[Aeonik] text-bone/[0.82] after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-bone/[0.12] after:content-[''] max-md:h-16"
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

function DetailItem({ label, value }: { label: string; value: string }) {
  const isLink = value.startsWith("https://");

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[18px] font-normal leading-[1.45] text-white">{label}</p>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="break-all text-[15px] font-light leading-[1.45] text-[#d3ff36]"
        >
          {value}
        </a>
      ) : (
        <p className="text-[15px] font-light leading-[1.45] text-[#bbb9ba]">{value}</p>
      )}
    </div>
  );
}

function SettingGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="grid grid-cols-[4px_1fr] gap-4">
      <span className="mt-0 h-8 w-1 bg-[#d3ff36]" />
      <div>
        <h3 className="text-[20px] font-medium leading-[1.45] text-white">{title}</h3>
        <div className="mt-6 flex flex-col gap-3 text-base font-light leading-[2] text-[#bbb9ba]">
          {items.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShowcaseSection({
  title,
  children,
  className = "",
  titleClassName = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <section className={["overflow-hidden rounded-2xl bg-[#1b1b1b]", className].filter(Boolean).join(" ")}>
      <div className="mx-auto w-[1466px] max-w-full px-[100px] py-20 max-lg:px-8 max-md:px-5">
        <h2 className={["text-[32px] font-medium leading-[1.3] text-white", titleClassName].filter(Boolean).join(" ")}>
          {title}
        </h2>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}

export default function GatePayPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <main className="min-h-screen bg-black font-[Poppins] text-white">
        <Header />
        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-[120px] px-[120px] pb-[160px] pt-[100px] max-2xl:px-[6.25vw] max-lg:gap-20 max-lg:px-8 max-lg:py-16 max-md:px-5 max-md:py-10">
          <ImageBlock src={assets.titleStrip} alt="Gate Pay Product Video" />

          <div className="flex flex-col gap-[120px] max-lg:gap-20">
            <section className="flex flex-col gap-10">
              <div className="flex h-[129px] items-end justify-between gap-8 max-lg:h-auto max-md:flex-col max-md:items-start">
                <div className="flex flex-col gap-2.5">
                  <h1 className="text-[56px] font-medium leading-[1.48] text-white max-md:text-4xl">
                    Gate Pay Video
                  </h1>
                  <p className="text-2xl font-medium leading-normal text-[#c3c3c3] max-md:text-lg">
                    A product promotional video presenting Gate Pay's global payment experience and Web3 capabilities
                  </p>
                </div>
                <div className="mb-0 flex w-[110px] shrink-0 flex-col items-start self-end text-left text-base font-light leading-normal text-[#c3c3c3] max-md:w-auto max-md:self-start">
                  <span>Product, UX/UI</span>
                  <span>2025-2026</span>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl bg-[#0555ff]">
                <ImageBlock src={assets.hero} alt="Gate Pay video hero presentation" />
              </div>
            </section>

            <section className="grid grid-cols-[1000px_427px] justify-between gap-16 max-2xl:grid-cols-[minmax(0,1000px)_minmax(300px,427px)] max-lg:grid-cols-1">
              <div className="flex flex-col">
                <div>
                  <h2 className="text-[32px] font-medium leading-[1.6] text-white max-md:text-2xl">
                    Gate Pay Global Payment Freedom
                  </h2>
                  <p className="mt-6 text-base font-light leading-[1.6] text-[#bbb9ba]">
                    Built around the idea of borderless payments, this video shows how Gate Pay uses technology to
                    create a secure, efficient, and seamless digital payment experience. The visual direction follows the
                    Gate Pay brand system, combining international tech polish with user-focused scenes and a future-facing
                    atmosphere.
                  </p>
                </div>

                <div className="mt-[60px] flex flex-col gap-5">
                  <SettingGroup title="Character Settings" items={roleSettings} />
                  <SettingGroup title="Other Settings" items={productionSettings} />
                </div>
              </div>

              <aside className="flex flex-col gap-12">
                {details.map(([label, value]) => (
                  <DetailItem key={label} label={label} value={value} />
                ))}
              </aside>
            </section>

            <section className="overflow-hidden rounded-2xl bg-[#1b1b1b]">
              <div className="mx-auto w-[1466px] max-w-full px-[100px] py-20 max-lg:px-8 max-md:px-5">
                <ImageBlock src={assets.plot} alt="Gate Pay plot creation table" />
              </div>
            </section>

            <ShowcaseSection title="Video Storyboard">
              <ImageBlock src={assets.storyboard} alt="Gate Pay video storyboard frames" />
            </ShowcaseSection>

            <section className="overflow-hidden rounded-2xl bg-[#1b1b1b]">
              <div className="mx-auto w-[1466px] max-w-full px-[100px] py-20 max-lg:px-8 max-md:px-5">
                <div className="max-w-[721px]">
                  <h2 className="text-[32px] font-medium leading-[2] text-white">Video Presentation</h2>
                  <p className="break-words text-[18px] font-normal leading-[2] text-[#838383]">
                    Online playback:{" "}
                    <a
                      className="text-[#d3ff36] underline [text-underline-position:from-font]"
                      href="https://www.yuque.com/u48984516/ktobpr/narq1xvloy4mto6c/edit"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://www.yuque.com/u48984516/ktobpr/narq1xvloy4mto6c/edit
                    </a>
                  </p>
                </div>
                <div className="mt-14">
                  <video
                    className="aspect-video w-full rounded-[24px] bg-black object-cover"
                    src={assets.finalVideo}
                    controls
                    playsInline
                    preload="metadata"
                  />
                </div>
              </div>
            </section>

            <section className="text-white">
              <h2 className="text-2xl font-medium leading-normal">Thank you for reviewing my case study.</h2>
              <p className="mt-4 text-base font-light leading-[1.5] text-[#d8d8d8]">
                You are welcome to explore my other work, experiments, and selected projects. For collaboration inquiries,
                please contact me at grey340611@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
