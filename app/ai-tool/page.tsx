import DecryptedText from "@/components/DecryptedText";
import MusicPlayer from "@/components/MusicPlayer";

const assetPath = "/assets/ai-tool";

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

export default function AiToolPage() {
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
        <Header />
        <section
          className="relative mx-auto aspect-[1920/4203] w-full max-w-[1920px] bg-black"
          data-name="20"
          data-node-id="217:8029"
        >
        <img
          alt=""
          className="pointer-events-none absolute left-[6.25%] top-[4.9726%] h-[7.1378%] w-[85.8854%] object-cover"
          data-name="01"
          data-node-id="217:8632"
          src={`${assetPath}/01.png`}
        />

        <section
          className="absolute left-[6.25%] top-[14.7049%] flex w-[87.5%] flex-col items-start gap-[clamp(24px,2.5vw,48px)]"
          data-node-id="217:8568"
        >
          <div
            className="flex w-[98.1548%] flex-col items-start gap-[clamp(16px,1.6667vw,32px)]"
            data-node-id="217:8570"
          >
            <h1
              className="w-full font-sans text-[clamp(24px,2.0833vw,40px)] font-normal capitalize leading-normal text-white"
              data-node-id="217:8571"
            >
              Cursor
            </h1>
            <ul
              className="w-full list-disc pl-[30px] text-[clamp(12px,1.0417vw,20px)] font-light leading-[2] text-[#fff7e5]"
              data-node-id="217:8572"
              style={{
                fontFamily:
                  "Poppins, var(--font-aeonik), Aeonik, Inter, ui-sans-serif, system-ui, sans-serif",
              }}
            >
              <li>
                Generate high-quality UI that complies with Gate.io&apos;s brand
                guidelines through a multi-layered constraint design system.
                The goal is not merely to &quot;let AI generate images,&quot; but to
                enable Cursor to consistently produce practical, reusable, and
                engineering-ready design solutions within the framework of
                Gate&apos;s brand, business, components, and rules.
              </li>
            </ul>
          </div>

          <img
            alt=""
            className="pointer-events-none h-auto w-full object-cover"
            data-name="02"
            data-node-id="217:8634"
            src={`${assetPath}/02.png`}
          />
        </section>

        <section
          className="absolute left-0 top-[42.1366%] grid w-full grid-cols-2"
          data-node-id="217:8504"
        >
          <img
            alt=""
            className="pointer-events-none h-auto w-full object-cover"
            data-name="03"
            data-node-id="217:8636"
            src={`${assetPath}/03.png`}
          />
          <img
            alt=""
            className="pointer-events-none h-auto w-full object-cover"
            data-name="04"
            data-node-id="217:8638"
            src={`${assetPath}/04.png`}
          />
          <img
            alt=""
            className="pointer-events-none h-auto w-full object-cover"
            data-name="05"
            data-node-id="217:8640"
            src={`${assetPath}/05.png`}
          />
          <img
            alt=""
            className="pointer-events-none h-auto w-full object-cover"
            data-name="06"
            data-node-id="217:8642"
            src={`${assetPath}/06.png`}
          />
        </section>

        <section
          className="absolute left-[6.25%] top-[94.385%] flex w-[87.5%] flex-col items-start gap-[clamp(8px,0.8333vw,16px)] text-white"
          data-node-id="217:8644"
        >
          <h2
            className="w-full text-[clamp(14px,1.25vw,24px)] font-medium leading-normal"
            data-node-id="217:8645"
            style={{
              fontFamily:
                "Poppins, var(--font-aeonik), Aeonik, Inter, ui-sans-serif, system-ui, sans-serif",
            }}
          >
            Thank you for reviewing my case study！
          </h2>
          <p
            className="w-full text-[clamp(10px,0.8333vw,16px)] font-light leading-[1.5]"
            data-node-id="217:8646"
            style={{
              fontFamily:
                "Poppins, var(--font-aeonik), Aeonik, Inter, ui-sans-serif, system-ui, sans-serif",
            }}
          >
            You are welcome to explore my other work, experiments, and selected
            projects. For collaboration inquiries, please contact me at
            grey340611@gmail.com.
          </p>
        </section>
        </section>
      </main>
    </>
  );
}
