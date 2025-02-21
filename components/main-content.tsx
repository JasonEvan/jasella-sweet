import { Button } from "./ui/button";

export default function Home({ handlePlay }: { handlePlay: () => void }) {
  return (
    <div className="text-white flex flex-col items-center h-screen z-10 justify-center mb-32">
      <div className="mb-10" data-aos="fade-up">
        <span className="font-styling">You are invited to attend:</span>
      </div>
      <div className="flex flex-col lg:flex-row text-center font-normal font-styling">
        <span className="text-7xl mb-2" data-aos="fade-up" data-aos-delay="300">
          Jasella&apos;s <span className="lg:inline hidden">Bday Party</span>
        </span>
        <span
          className="text-4xl lg:hidden"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Bday Party
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
