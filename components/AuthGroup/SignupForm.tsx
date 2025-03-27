"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconInput } from "./IconInput";
import { InputPasswordSignup } from "./InputPasswordSignup";
import { Button } from "../ui/button";
import { User, Mail, LoaderCircle } from "lucide-react";
import { AvatarUploader } from "./AvatarUploader";
import { signupUser } from "@/lib/actions/auth/signup";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  image: z.string(),
  fullname: z.string().min(1, { message: "Full name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Please use a strong password." })
    .regex(/[0-9]/, { message: "Password must contain at least 1 number." })
    .regex(/[a-z]/, { message: "Password must contain at least 1 lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least 1 uppercase letter." }),
});

export const SignupForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      fullname: "",
      email: "",
      password: "",
    },
  });

  const { setValue } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    setIsLoading(true);
    const response = await signupUser(values);

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
        <div>
          <AvatarUploader
            onImageSelect={(img) => {
              setValue("image", img);
            }}
          />
        </div>

        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <IconInput Icon={User} placeholder="Full Name" autoComplete="on" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                <InputPasswordSignup placeholder="Password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          Sign up
          {isLoading && <LoaderCircle className="animate-spin" size={20} />}
        </Button>
      </form>
      <p className="text-center mt-3.5">
        Already have an account?{" "}
        <Button variant="link" className="!text-lg !font-semibold">
          <Link href="/login">Login</Link>
        </Button>
      </p>
    </Form>
  );
};
