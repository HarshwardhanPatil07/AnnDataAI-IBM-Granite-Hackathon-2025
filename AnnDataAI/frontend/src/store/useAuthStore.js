import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import useTokenStore from "./useTokenStore";

// Initial user state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Set user information
        setUser: (userData) => {
          set({
            user: userData,
            isAuthenticated: true,
          });

          // Also update token store if it exists
          if (userData?.token) {
            useTokenStore.getState().setToken(userData.token);
          }

          if (userData?.role) {
            useTokenStore.getState().setUserRole(userData.role);
          }

          if (userData?._id) {
            useTokenStore.getState().setUserId(userData._id);
          }
        },

        // Login loading state
        setLoading: (status) => set({ isLoading: status }),

        // Set error message
        setError: (message) => set({ error: message }),

        // Clear error
        clearError: () => set({ error: null }),

        // Logout and clear user data
        logout: () => {
          // Clear token first
          useTokenStore.getState().clearToken();

          // Then reset auth state
          set(initialState);
        },

        // Check if user is admin
        isAdmin: () => {
          const { userRole } = useTokenStore.getState();
          return userRole === "admin";
        },

        // Get current user
        getUser: () => get().user,

        // Initialize from token store (useful on app load)
        initFromToken: () => {
          const { token, userId, userRole } = useTokenStore.getState();
          if (token) {
            set({
              user: { _id: userId, role: userRole },
              isAuthenticated: true,
            });
            return true;
          }
          return false;
        },
      }),
      {
        name: "auth-store", // persist key name
      }
    ),
    {
      name: "AuthStore", // devtools store name
    }
  )
);

export default useAuthStore;
