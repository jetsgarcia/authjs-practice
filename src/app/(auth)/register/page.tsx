"use client";

import type React from "react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CheckSquare, Eye, EyeOff, Loader2, Square } from "lucide-react";
import { useForm } from "react-hook-form";
import { registerSchema } from "./_schemas/registerSchema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "./_actions/register";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "../_components/form-error";
import Socials from "../_components/socials";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);

  const passwordRequirements = [
    { regex: /.{8,}/, message: "At least 8 characters" },
    { regex: /[A-Z]/, message: "One uppercase letter" },
    { regex: /[a-z]/, message: "One lowercase letter" },
    { regex: /[0-9]/, message: "One number" },
    { regex: /[!@#$%^&*(),.?\":{}|<>]/, message: "One special character" },
  ];

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof registerSchema>) {
    setError("");
    setLoading(true);
    register(data)
      .then((response) => {
        if (response?.error) {
          setError(response.error);
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nickname</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John"
                        required
                        className="capitalize"
                      />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="name@example.com"
                        required
                      />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={passwordVisibility ? "text" : "password"}
                          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                          required
                          onFocus={() => setIsPasswordInputFocused(true)}
                          onBlur={() => setIsPasswordInputFocused(false)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() =>
                            setPasswordVisibility(!passwordVisibility)
                          }
                          className="absolute right-0 top-0"
                        >
                          {passwordVisibility ? <Eye /> : <EyeOff />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                    {isPasswordInputFocused && (
                      <>
                        {passwordRequirements.map((requirement, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            {requirement.regex.test(field.value || "") ? (
                              <CheckSquare
                                className="text-green-500"
                                size={16}
                              />
                            ) : (
                              <Square size={16} />
                            )}
                            <div
                              className={`text-sm ${
                                requirement.regex.test(field.value || "")
                                  ? "text-green-500"
                                  : ""
                              }`}
                            >
                              {requirement.message}
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={confirmPasswordVisibility ? "text" : "password"}
                          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() =>
                            setConfirmPasswordVisibility(
                              !confirmPasswordVisibility
                            )
                          }
                          className="absolute right-0 top-0"
                        >
                          {confirmPasswordVisibility ? <Eye /> : <EyeOff />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <Button
                type="submit"
                className="w-full hover:cursor-pointer"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Register"}
              </Button>
            </form>
          </Form>

          <div className="flex items-center space-x-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">
              OR CONTINUE WITH
            </span>
            <Separator className="flex-1" />
          </div>

          <Socials />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
