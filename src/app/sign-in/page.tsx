'use client'

import React, { useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/auth/authentication.context";
import Image from 'next/image';
import { NICKNAME_COOKIE_KEY } from "@/auth/nickname-cookie.key";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const useLocalStorage = () => {
  // const setItem = useCallback((key: string, value: string) => localStorage.setItem(key, value), []);
  // const getItem = useCallback((key: string) => localStorage.getItem(key), []);
  const setItem = (key: string, value: string): void => localStorage.setItem(key, value);
  const getItem = (key: string): string | null => localStorage.getItem(key);

  // Check window to avoid SSR error
  if (typeof window === 'undefined') {
    return {
      getItem: () => null,
      setItem: () => {
      },
    };
  }

  return {getItem, setItem};
}

export default function Page() {
  const ref = useRef<HTMLInputElement | null>(null);
  const {isAuthenticated, authenticate} = useAuth();
  const {replace} = useRouter();
  const {getItem, setItem} = useLocalStorage();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: getItem(NICKNAME_COOKIE_KEY) ?? '',
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      replace('/');
    }
  }, [isAuthenticated, replace]);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const onSubmit = ({username}: z.infer<typeof formSchema>) => {
    authenticate(username);
    setItem(NICKNAME_COOKIE_KEY, username)
  }

  return (
    <main className="h-full w-full flex justify-center items-center bg-slate-100">
      <div className="border rounded-2xl p-8 bg-white w-96">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-center">
            <Image src="/icons/256.png" height={100} width={100} alt="qwixx logo" className="mx-auto rounded-2xl"/>

            <FormField
              control={form.control}
              name="username"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">Join the game</Button>
          </form>
        </Form>
      </div>

    </main>
  );
}
