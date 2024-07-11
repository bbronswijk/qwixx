import { createContext, useContext } from "react";

interface AuthenticationContextValue {
  authenticate: (userName: string) => void;
  logOut: () => void;
  isAuthenticated: boolean;
  userName: string | undefined;
}

export const AuthenticationContext = createContext<AuthenticationContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error('MemberContext has not been initialized.');
  }

  return context;
};
