"use client";

import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { AuthenticationContext } from "@/auth/authentication.context";

/**
 * Using cookies since localStorage is not available on the server side.
 */
export const Authenticate = ({ children }: PropsWithChildren) => {
  const { replace } = useRouter();
  const pathName = usePathname();
  const [nickname, setNickname] = useState<string>("");
  const isAuthenticated = !!nickname;

  // Store the username in the cookie.
  const authenticate = useCallback((value: string) => {
    setNickname(value);
  }, []);

  // Remove the username cookie.
  const logOut = useCallback(() => {
    setNickname("");
  }, []);

  // Guard the routes that require authentication.
  useEffect(() => {
    if (!isAuthenticated && pathName !== "/sign-in") {
      replace("/sign-in");
    }
  }, [isAuthenticated, pathName, replace]);

  return (
    <AuthenticationContext.Provider value={{ authenticate, logOut, isAuthenticated, nickname }}>
      {!isAuthenticated && pathName !== "/sign-in" ? null : children}
    </AuthenticationContext.Provider>
  );
};
