import DecryptedText from "@/components/DecryptedText";
import MusicPlayer from "@/components/MusicPlayer";

const assets = {
  title: "/assets/illustration/01.png",
  hero: "/assets/illustration/02.png",
  gallery: [
    "/assets/illustration/image_01.png",
    "/assets/illustration/image_02.png",
    "/assets/illustration/image_03.png",
    "/assets/illustration/image_04.png",
    "/assets/illustration/image_05.png",
    "/assets/illustration/image_06.png",
    "/assets/illustration/image_07.png",
    "/assets/illustration/image_08.png",
    "/assets/illustration/image_09.png",
    "/assets/illustration/image_10.png",
  ],
};

function Header() {
  return (
    <div className="px-[clamp(18px,3vw,44px)]">
      <header
        aria-label="Primary navigation"
        className="relative grid h-20 grid-cols-[1fr_auto_auto] items-center gap-x-[clamp(18px,3vw,46px)] font-[Aeonik] text-bone/[0.82] after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-bone/[0.12] after:content-[''] max-md:h-16"
      >
        <a
          aria-label="Grey home"
          className="link-underline loco-nav-link brand-link w-max"
          href="/"
          data-no-transition="true"
        >
          <DecryptedText
            animateOn="hover"
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@/#$%&"
            className="text-bone/[0.82]"
            encryptedClassName="text-mint"
            maxIterations={12}
            parentClassName="decrypt-brand"
            speed={34}
            text="@GREY DESIGN PORTFOLIO"
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
  return (
    <img
      alt={alt}
      className={["block", className].filter(Boolean).join(" ")}
      src={src}
    />
  );
}

function ProjectHeading() {
  return (
    <div className="flex w-full items-end justify-between whitespace-nowrap max-lg:items-start max-lg:gap-8 max-md:flex-col max-md:whitespace-normal">
      <div className="flex flex-col items-start gap-2.5">
        <h1 className="text-[56px] font-medium leading-normal text-white max-md:text-[36px]">
          Beyond Pixels
        </h1>
        <p className="text-center text-2xl font-medium leading-normal text-[#c3c3c3] max-md:text-left max-md:text-base">
          Sketches, illustrations, and ideas captured along the way.
        </p>
      </div>
      <div className="flex flex-col items-end gap-1 text-right text-base font-light leading-normal text-[#c3c3c3] max-md:items-start max-md:text-left">
        <span>illustration</span>
        <span>2022-2023</span>
      </div>
    </div>
  );
}

export default function IllustrationPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap"
        rel="stylesheet"
      />

      <main className="min-h-screen overflow-x-hidden bg-black font-[Poppins] text-white">
        <Header />
        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-[120px] bg-black px-[120px] pb-[188px] pt-[92px] max-2xl:px-[6.25vw] max-lg:gap-20 max-md:px-6 max-md:pb-24 max-md:pt-12">
          <CaseImage
            alt="Illustration title graphic"
            className="h-[300px] w-full object-cover object-left max-md:h-auto"
            src={assets.title}
          />

          <section className="flex h-[969px] w-full flex-col gap-10 max-md:h-auto">
            <ProjectHeading />
            <CaseImage
              alt="Framed sketch and illustration collage"
              className="h-[800px] w-full rounded-2xl object-cover max-md:h-auto"
              src={assets.hero}
            />
          </section>

          <section className="h-auto w-full overflow-hidden rounded-2xl bg-[#1b1b1b] px-20 pb-[120px] pt-20 max-lg:px-10 max-md:px-5 max-md:pb-16 max-md:pt-10">
            <div className="flex w-full flex-col items-start gap-20 max-md:gap-10">
              <h2 className="w-[944px] max-w-full text-[64px] font-bold leading-[1.5] text-white max-md:text-[32px]">
                A different way to capture visuals, emotions, and creativity.
              </h2>
              <div className="grid w-full grid-cols-2 gap-20 max-lg:gap-10 max-md:grid-cols-1 max-md:gap-6">
                {assets.gallery.map((src, index) => (
                  <div className="w-full overflow-hidden" key={src}>
                    <CaseImage
                      alt={`Illustration gallery image ${index + 1}`}
                      className="h-auto w-full object-contain transition-transform duration-700 ease-out hover:scale-105"
                      src={src}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="flex h-[76px] w-full flex-col gap-4 text-white max-md:h-auto">
            <h2 className="text-2xl font-medium leading-normal">
              Thank you for reviewing my case study！
            </h2>
            <p className="text-base font-light leading-[1.5]">
              You are welcome to explore my other work, experiments, and selected projects. For collaboration inquiries, please contact me at grey340611@gmail.com.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
