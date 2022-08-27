import { atom } from "recoil";

export const openModal = atom<boolean>({
  key: "openModal",
  default: false,
});

export const typeModalState = atom<string>({
  key: "typeModalState",
  default: "notes",
});

export const editModalState = atom<boolean>({
  key: "editModalState",
  default: false,
});

export const docIdState = atom<string>({
  key: "docIdState",
  default: "",
});
