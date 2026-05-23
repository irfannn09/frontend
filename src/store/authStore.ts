import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  isLogin: boolean;
  nim: string;

  login: (
    nim: string,
    password: string
  ) => void;

  logout: () => void;
};

export const useAuthStore =
  create<AuthState>()(
    persist(
      (set) => ({
        isLogin: false,
        nim: "",

        login: (nim, password) => {
          if (
            nim === "24090107" &&
            password === "admin123"
          ) {
            set({
              isLogin: true,
              nim,
            });
          } else {
            alert("Login gagal");
          }
        },

        logout: () =>
          set({
            isLogin: false,
            nim: "",
          }),
      }),
      {
        name: "auth-storage",
      }
    )
  );