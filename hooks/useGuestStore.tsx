import { create } from "zustand";
import { IGuestAttendance } from "@/lib/dto";

interface GuestStore {
  guest: IGuestAttendance;
  setGuest: (guest: IGuestAttendance) => void;
}

export const useGuest = create<GuestStore>((set) => ({
  guest: {
    name: "",
    isAlreadyFilled: false,
    personAttended: 0,
    personInvited: 0,
  },
  setGuest: (newGuest) => {
    set({ guest: newGuest });
  },
}));
