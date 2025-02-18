import { Button } from "./ui/button";

export default function Home({ handlePlay }: { handlePlay: () => void }) {
  return (
    <div className="text-white flex flex-col items-center h-screen z-10 justify-center mb-32">
      <div className="mb-10" data-aos="fade-up">
        <span className="font-styling">Are you ready for the party at:</span>
      </div>
      <div className="flex flex-col lg:flex-row text-right font-normal font-styling">
        <span className="text-7xl" data-aos="fade-up" data-aos-delay="300">
          March 8th <span className="lg:inline hidden">2025</span>
        </span>
        <span
          className="text-7xl lg:hidden"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          2025
        </span>
      </div>
      <Button className="mt-10" data-aos="fade-up" data-aos-delay="600">
        <a href="#my-wish" onClick={handlePlay}>
          Let&apos;s Go!
        </a>
      </Button>
    </div>
  );
}
