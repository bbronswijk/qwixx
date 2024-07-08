'use client';

import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { useToast } from "@/components/ui/use-toast";
import { AuthenticationContext } from "@/app/auth/authentication.context";
import { NICKNAME_COOKIE_KEY } from "@/app/auth/nickname-cookie.key";

export const Authenticate = ({children}: PropsWithChildren) => {
  const {replace} = useRouter();
  const {toast} = useToast()
  const pathName = usePathname();
  const cookies = useCookies();
  const [userName, setUserName] = useState<string | undefined>(cookies.get(NICKNAME_COOKIE_KEY));
  const isAuthenticated = !!userName;

  // Store the username in the cookie.
  const authenticate = useCallback((value: string) => {
    cookies.set(NICKNAME_COOKIE_KEY, value);
    setUserName(value);
    toast({description: `Logged in as ${value}`});
  }, [cookies, toast]);

  // Guard the routes that require authentication.
  useEffect(() => {
    if (!isAuthenticated && pathName !== '/sign-in') {
      replace('/sign-in');
    }
  }, [isAuthenticated, pathName, replace]);


  return (
    <AuthenticationContext.Provider value={{authenticate, isAuthenticated, userName}}>
      {!isAuthenticated && pathName !== '/sign-in' ? null : children}
    </AuthenticationContext.Provider>
  );
}