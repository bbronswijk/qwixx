'use client';

import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { AuthenticationContext } from "@/auth/authentication.context";
import { NICKNAME_COOKIE_KEY } from "@/auth/nickname-cookie.key";

export const Authenticate = ({children}: PropsWithChildren) => {
  const {replace} = useRouter();
  const pathName = usePathname();
  const cookies = useCookies();
  const [userName, setUserName] = useState<string | undefined>(cookies.get(NICKNAME_COOKIE_KEY));
  const isAuthenticated = !!userName;

  // Store the username in the cookie.
  const authenticate = useCallback((value: string) => {
    cookies.set(NICKNAME_COOKIE_KEY, value);
    setUserName(value);
  }, [cookies]);

  // Remove the username cookie.
  const logOut = useCallback(() => {
    cookies.remove(NICKNAME_COOKIE_KEY);
    setUserName(undefined);
  }, [cookies]);

  // Guard the routes that require authentication.
  useEffect(() => {
    if (!isAuthenticated && pathName !== '/sign-in') {
      replace('/sign-in');
    }
  }, [isAuthenticated, pathName, replace]);


  return (
    <AuthenticationContext.Provider value={{authenticate, logOut, isAuthenticated, userName}}>
      {!isAuthenticated && pathName !== '/sign-in' ? null : children}
    </AuthenticationContext.Provider>
  );
}