export default function Location() {
  return (
    <div id="location" className="mb-48">
      <div className="flex justify-center" data-aos="fade-up">
        <span className="font-secondary text-white text-3xl mb-14">
          The party will be held at:
        </span>
      </div>
      <div className="flex flex-col items-center">
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.141232693383!2d110.42708067493646!3d-6.992641693008434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708ca81dcaa48d%3A0x9ff132c870e26a50!2sSixteen%208!5e0!3m2!1sid!2sid!4v1736261854654!5m2!1sid!2sid"
            width="400"
            height="300"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            data-aos="fade-up"
            data-aos-delay="300"
          ></iframe>
        </div>
        <div
          className="flex flex-col lg:justify-around text-white font-normal text-xl sm:ps-5 xs:ps-5 mt-8 font-styling"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <span>Date: March 8th, 2025</span>
          <span>Time: 17.00</span>
          <span>Location: Sixteen 8</span>
          <span>Dresscode:</span>
          <div className="flex flex-col text-start">
            <span className="ms-5">Guest: White</span>
            <span className="ms-5">Family: Rose Gold</span>
          </div>
        </div>
      </div>
    </div>
  );
}
