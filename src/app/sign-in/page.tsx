"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/auth/authentication.context";
import Image from "next/image";
import { NICKNAME_COOKIE_KEY } from "@/auth/nickname-cookie.key";
import { useLocalStorage } from "@/utils/use-localstorage";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function Page() {
  const ref = useRef<HTMLInputElement | null>(null);
  const { isAuthenticated, authenticate } = useAuth();
  const { replace } = useRouter();
  const { getItem, setItem } = useLocalStorage();
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: getItem(NICKNAME_COOKIE_KEY) ?? "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      replace("/");
    }
  }, [isAuthenticated, replace]);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    // Listen to resize events
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onSubmit = ({ username }: z.infer<typeof formSchema>) => {
    authenticate(username);
    setItem(NICKNAME_COOKIE_KEY, username);
  };

  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-100 p-4'>
      <div className='w-full rounded-2xl border bg-white p-8'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 text-center'>
            <Image src='/icons/256.png' height={100} width={100} alt='qwixx logo' className='mx-auto rounded-2xl' />

            <div className='text-xs text-gray-500'>
              Viewport: {viewportSize.width}x{viewportSize.height} | Zoom: {Math.round(window.devicePixelRatio * 100)}%
            </div>

            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Enter your name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type='submit'>
              Join the game
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
