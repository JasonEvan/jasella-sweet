import { IGuestAttendance } from "@/lib/dto";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Attendance({
  data,
  setGuest,
  code,
}: {
  data: IGuestAttendance;
  setGuest: (guest: IGuestAttendance) => void;
  code: string;
}) {
  const [isSubmitable, setIsSubmitable] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Person Attend?");

  function handleSubmit() {
    Swal.fire({
      title: "Are you sure?",
      text: "Already check the data?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I'm sure",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.NEXT_PUBLIC_BE_URL}/api/guest/${code}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personAttended: Number(selectedValue),
          }),
          cache: "no-store",
        })
          .then((res) => {
            if (res.status == 200) {
              toast("Success submit attendance, thank you!", {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
              });
            } else {
              toast("Failed submitting attendance, please try again later", {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
              });
            }
          })
          .catch((err) => {
            toast(err, {
              position: "top-right",
              autoClose: 5000,
              theme: "dark",
            });
            return;
          });

        const newGuest: IGuestAttendance = {
          ...data,
          personAttended: Number(selectedValue),
          isAlreadyFilled: true,
        };

        setGuest(newGuest);
      }
    });
  }

  function handleReject() {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really not coming",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I'm sure",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.NEXT_PUBLIC_BE_URL}/api/guest/${code}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personAttended: 0,
          }),
          cache: "no-store",
        })
          .then((res) => {
            if (res.status == 200) {
              toast("Success submit attendance, thank you!", {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
              });
            } else {
              toast("Failed submitting attendance, please try again later", {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
              });
            }
          })
          .catch((err) => {
            toast(err, {
              position: "top-right",
              autoClose: 5000,
              theme: "dark",
            });
            return;
          });

        const newGuest: IGuestAttendance = {
          ...data,
          personAttended: 0,
          isAlreadyFilled: true,
        };

        setGuest(newGuest);
      }
    });
  }

  return (
    <div className="flex flex-col items-center mb-44">
      <div className="text-center mb-5" data-aos="fade-up">
        <span className="font-secondary font-normal text-3xl text-white">
          Confirm Your Attendance
        </span>
      </div>
      <div className="w-screen p-5" data-aos="fade-up">
        {/* name */}
        <label className="form-control">
          <div className="label">
            <span className="label-text text-white">Your Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            readOnly
            disabled
            value={data.name}
          />
        </label>
        <select
          value={selectedValue}
          onChange={(e) => {
            setSelectedValue(e.target.value);
            setIsSubmitable(e.target.value !== "Person Attend?");
          }}
          className="select select-bordered w-full max-w-xs mt-3"
        >
          <option disabled>Person Attend?</option>
          {Array.from({ length: data.personInvited }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="pt-5 flex justify-evenly w-screen" data-aos="fade-up">
        <button className="btn btn-error" onClick={handleReject}>
          Not Coming
        </button>
        <button
          className="btn btn-success"
          disabled={!isSubmitable}
          onClick={handleSubmit}
        >
          I&apos;m Coming!
        </button>
      </div>
    </div>
  );
}
