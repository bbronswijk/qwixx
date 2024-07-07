'use client'

import React, { useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/auth/authentication.context";
import Image from 'next/image';

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function Page() {
  const ref = useRef<HTMLInputElement | null>(null);
  const {isAuthenticated, authenticate} = useAuth();
  const {replace} = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      console.log('Redirecting to home page')
      replace('/'); // TODO join room?
    }
  }, [isAuthenticated, replace]);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const onSubmit = ({username}: z.infer<typeof formSchema>) => {
    authenticate(username);
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
