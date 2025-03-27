"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconInput } from "./IconInput";
import { InputPassword } from "./InputPassword";
import { Button } from "../ui/button";
import { Mail, LoaderCircle } from "lucide-react";
import { loginUser } from "@/lib/actions/auth/login";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password should be at least 8 characters long." }),
});

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;

    setIsLoading(true);
    const response = await loginUser(email, password);

    if (response.success) {
      toast("Success", {
        description: response.message,
      });
      redirect("/dashboard");
    } else {
      toast("Error", {
        description: response.message,
      });
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <IconInput Icon={Mail} placeholder="Email Address" autoComplete="on" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputPassword placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-7">
          <Button variant="link" type="button" className="ml-auto">
            Forget Password?
          </Button>
          <Button type="submit" disabled={isLoading}>
            Login
            {isLoading && <LoaderCircle className="animate-spin" size={20} />}
          </Button>
        </div>
      </form>
      <p className="text-center mt-3.5">
        Don&apos;t have an account?{" "}
        <Button variant="link" className="!text-lg !font-semibold">
          <Link href="/signup">Sign up</Link>
        </Button>
      </p>
    </Form>
  );
};
