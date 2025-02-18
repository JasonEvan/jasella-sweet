import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";

export default function GiveWish({ name }: { name: string }) {
  const [tempName, setTempName] = useState<string>(name);
  const [wish, setWish] = useState<string>("");

  useEffect(() => {
    setTempName(name);
  }, [name]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!tempName.trim() || !wish.trim()) {
      toast("Name and wish cannot be empty", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }

    try {
      const sanitizedName = DOMPurify.sanitize(tempName);
      const sanitizedWish = DOMPurify.sanitize(wish);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/api/wish`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: sanitizedName,
            wish: sanitizedWish,
          }),
          cache: "no-store",
        }
      );

      if (response.status == 200) {
        setTempName("");
        setWish("");
        // Kasi Feedback
        toast("Wish submitted", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      } else {
        const data = await response.json();
        // Kasi Feedback
        toast(data.errors, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Failed to submit wish, please try again later", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  }

  return (
    <div className="flex flex-col items-center mb-44">
      <div className="text-center mb-5" data-aos="fade-up">
        <span className="font-secondary font-normal text-3xl text-white">
          Give Me Some Wishes
        </span>
      </div>
      <div className="w-screen p-5" data-aos="fade-up">
        <form action="">
          {/* name */}
          <label className="form-control">
            <div className="label">
              <span className="label-text text-white">What is your name?</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
            />
          </label>
          {/* wishes */}
          <label className="form-control">
            <div className="label">
              <span className="label-text text-white">
                Type your wishes here
              </span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Your Wishes"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
            ></textarea>
          </label>
          <div className="text-center pt-5">
            <button
              className="btn btn-xs xs:btn-sm sm:btn-sm md:btn-md lg:btn-lg"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
