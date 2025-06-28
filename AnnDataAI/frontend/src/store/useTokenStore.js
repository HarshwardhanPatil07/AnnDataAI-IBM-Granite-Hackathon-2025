import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Helper to get token from localStorage/sessionStorage if available
const getInitialToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("auth-token") ||
    sessionStorage.getItem("token") ||
    sessionStorage.getItem("auth-token") ||
    ""
  );
};

// Helper to get user role from localStorage
const getInitialRole = () => {
  return localStorage.getItem("userRole") || "";
};

const useTokenStore = create(
  devtools(
    persist(
      (set) => ({
        token: getInitialToken(),
        userId: null,
        userRole: getInitialRole(),
        setToken: (data) => {
          console.log("Token set in Zustand store");
          set({ token: data });
        },
        clearToken: () => {
          // Also clear from localStorage when logging out
          localStorage.removeItem("token");
          localStorage.removeItem("auth-token");
          localStorage.removeItem("userRole");
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("auth-token");
          set({ token: "", userId: null, userRole: "" });
        },
        setUserId: (id) => set({ userId: id }),
        setUserRole: (role) => {
          localStorage.setItem("userRole", role);
          set({ userRole: role });
        },
      }),
      {
        name: "auth-token", // persist key name
      }
    ),
    {
      name: "TokenStore", // devtools store name
    }
  )
);

export default useTokenStore;
