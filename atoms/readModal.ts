import { atom } from "recoil";

export const readModal = atom<boolean>({
  key: "readModal",
  default: false,
});

export const readDocIdModal = atom<string>({
  key: "readDocIdModal",
  default: "",
});
