import type { ReactNode } from "react";
import DecryptedText from "@/components/DecryptedText";
import MusicPlayer from "@/components/MusicPlayer";

const assetPath = "/assets/gatepay-video";

const settings = [
  {
    title: "Character Settings",
    copy: [
      'Character A: young male digital entrepreneur, Asian face. Prompt: "Asian young adult male, tech entrepreneur style, confident expression, wearing smart casual outfit, studio lighting --v 7 --style raw"',
      'Character B: female freelancer, Western face. Prompt: "White female freelancer, working on laptop at cafe, casual chic outfit, natural light --v 7 --style raw"',
    ],
  },
  {
    title: "Other Settings",
    copy: [
      "Duration: 60s",
      "Visual style: futuristic intelligent scenes with a tech-realistic look, combining user scenarios, intelligent UI motion, and a clean bright background.",
      "Music / rhythm: electronic synth with progressive drums, matched to camera transitions to express product professionalism and a future-facing tone.",
    ],
  },
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

function Showcase({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl bg-[#1b1b1b]">
      <div className="mx-auto w-full max-w-[1466px] px-[100px] py-20 max-lg:px-8 max-md:px-5">
        {title ? (
          <h2 className="mb-14 text-[32px] font-medium leading-[1.3] text-white max-md:text-2xl">
            {title}
          </h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export default function GatePayVideoPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <main
        className="min-h-screen overflow-x-hidden bg-black text-white"
        style={{
          fontFamily:
            "Poppins, var(--font-aeonik), Aeonik, Inter, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div className="mx-auto w-full max-w-[1920px]">
          <Header />

          <div className="flex flex-col gap-[120px] px-[120px] pb-40 pt-[100px] max-2xl:px-[6.25vw] max-lg:gap-20 max-lg:px-8 max-lg:py-16 max-md:px-5">
            <CaseImage
              alt="Gate Pay Product Video"
              className="h-auto w-full"
              src={`${assetPath}/00.png`}
            />

            <section className="flex flex-col gap-10">
              <div className="flex min-h-[129px] items-end justify-between gap-8 max-lg:min-h-0 max-md:flex-col max-md:items-start">
                <div>
                  <h1 className="text-[56px] font-medium leading-[1.48] text-white max-md:text-4xl">
                    Gate Pay Video
                  </h1>
                  <p className="mt-2.5 max-w-[930px] text-2xl font-medium leading-[1.5] text-[#c3c3c3] max-md:text-lg">
                    A product promotional video presenting Gate Pay&apos;s global payment experience and Web3 capabilities
                  </p>
                </div>
                <div className="w-[110px] shrink-0 text-left text-base font-light leading-[1.5] text-[#c3c3c3] max-md:w-auto">
                  <div>Product, UX/UI</div>
                  <div>2025-2026</div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl bg-[#0555ff]">
                <CaseImage
                  alt="Gate Pay video hero presentation"
                  className="h-auto w-full"
                  src={`${assetPath}/01.png`}
                />
              </div>
            </section>

            <section className="grid grid-cols-[minmax(0,1000px)_minmax(300px,427px)] justify-between gap-16 max-lg:grid-cols-1">
              <div>
                <h2 className="text-[32px] font-medium leading-[1.6] text-white max-md:text-2xl">
                  Gate Pay Global Payment Freedom
                </h2>
                <p className="mt-6 text-base font-light leading-[1.6] text-[#bbb9ba]">
                  Built around the idea of borderless payments, this video shows how Gate Pay uses technology to create a secure, efficient, and seamless digital payment experience. The visual direction follows the Gate Pay brand system, combining international tech polish with user-focused scenes and a future-facing atmosphere.
                </p>

                <div className="mt-[60px] flex flex-col gap-5">
                  {settings.map((item) => (
                    <div className="grid grid-cols-[4px_1fr] gap-4" key={item.title}>
                      <span className="mt-1 h-8 w-1 bg-[#d3ff36]" />
                      <div>
                        <h3 className="text-xl font-medium leading-[1.45] text-white">
                          {item.title}
                        </h3>
                        <div className="mt-6 flex flex-col gap-3 text-base font-light leading-[2] text-[#bbb9ba]">
                          {item.copy.map((copy) => (
                            <p key={copy}>{copy}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="flex flex-col gap-12">
                <div>
                  <p className="text-lg font-normal leading-[1.45] text-white">Scope</p>
                  <p className="mt-3 text-[15px] font-light leading-[1.45] text-[#bbb9ba]">
                    Script design, AI storyboard, AI video creation
                  </p>
                </div>
                <div>
                  <p className="text-lg font-normal leading-[1.45] text-white">Watch link</p>
                  <p className="mt-3 break-words text-[15px] font-light leading-[1.45] text-[#bbb9ba]">
                    <a
                      className="text-[#d3ff36] underline"
                      href="https://www.yuque.com/u48984516/ktobpr/narq1xvloy4mto6c/edit"
                      rel="noreferrer"
                      target="_blank"
                    >
                      https://www.yuque.com/u48984516/ktobpr/narq1xvloy4mto6c/edit
                    </a>
                  </p>
                </div>
                <div>
                  <p className="text-lg font-normal leading-[1.45] text-white">Timeline</p>
                  <p className="mt-3 text-[15px] font-light leading-[1.45] text-[#bbb9ba]">1 month</p>
                </div>
              </aside>
            </section>

            <Showcase>
              <CaseImage
                alt="Gate Pay plot creation table"
                className="h-auto w-full"
                src={`${assetPath}/02.png`}
              />
            </Showcase>

            <Showcase title="Video Storyboard">
              <CaseImage
                alt="Gate Pay video storyboard frames"
                className="h-auto w-full"
                src={`${assetPath}/03.png`}
              />
            </Showcase>

            <Showcase>
              <div>
                <h2 className="max-w-[721px] text-[32px] font-medium leading-[2] text-white max-md:text-2xl">
                  Video Presentation
                </h2>
                <p className="break-words text-lg font-normal leading-[2] text-[#838383]">
                  Online playback:{" "}
                  <a
                    className="text-[#d3ff36] underline"
                    href="https://www.yuque.com/u48984516/ktobpr/narq1xvloy4mto6c/edit"
                    rel="noreferrer"
                    target="_blank"
                  >
                    https://www.yuque.com/u48984516/ktobpr/narq1xvloy4mto6c/edit
                  </a>
                </p>
              </div>
              <div className="mt-14">
                <video
                  className="aspect-video w-full rounded-3xl bg-black object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  src={`${assetPath}/gate-pay-final.mov`}
                />
              </div>
            </Showcase>

            <section className="text-white">
              <h2 className="text-2xl font-medium leading-[1.5]">
                Thank you for reviewing my case study.
              </h2>
              <p className="mt-4 text-base font-light leading-[1.5] text-[#d8d8d8]">
                You are welcome to explore my other work, experiments, and selected projects. For collaboration inquiries, please contact me at grey340611@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
