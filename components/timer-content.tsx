import { useEffect, useState } from "react";

interface CustomCSSProperties extends React.CSSProperties {
  "--value"?: number;
}

export default function Timer() {
  const hariH = new Date("Mar 8, 2025 17:00:00").getTime();
  const [day, setDay] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = hariH - now;
      if (distance > 0) {
        setDay(Math.floor(distance / (1000 * 60 * 60 * 24)));
        setHours(
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        );
        setMin(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        setSec(Math.floor((distance % (1000 * 60)) / 1000));
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [hariH]);

  return (
    <div className="text-white mb-44">
      <div className="text-center mb-5">
        <span
          className="text-3xl font-secondary font-normal"
          data-aos="fade-up"
        >
          Save the date
        </span>
      </div>
      {/* countdown */}
      <div
        className="flex justify-center"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": day } as CustomCSSProperties}></span>
            </span>
            days
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": hours } as CustomCSSProperties}></span>
            </span>
            hours
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": min } as CustomCSSProperties}></span>
            </span>
            min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": sec } as CustomCSSProperties}></span>
            </span>
            sec
          </div>
        </div>
      </div>
    </div>
  );
}
