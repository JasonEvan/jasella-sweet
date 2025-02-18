import Image from "next/image";

export default function Gallery({
  title,
  images,
  otherClass,
}: {
  title: string;
  images: string[];
  otherClass?: string;
}) {
  return (
    <div className={`flex flex-col items-center ${otherClass}`}>
      <span
        className="text-3xl font-normal font-secondary mb-5 text-white"
        data-aos="fade-up"
      >
        {title}
      </span>
      <div className="flex flex-col w-screen px-3">
        {images.map((img, idx) => (
          <div
            className={`relative w-52 h-[300px] self-start mb-3 ${
              idx % 2 == 0 ? "self-start" : "self-end"
            }`}
            key={idx}
            data-aos="fade-up"
          >
            <Image
              key={idx}
              src={`/img/${img}`}
              alt={img}
              fill
              className="object-contain rounded-2xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
