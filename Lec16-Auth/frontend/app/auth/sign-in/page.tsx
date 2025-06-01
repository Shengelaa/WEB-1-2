"use client";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const resp = await fetch("http://localhost:4000/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await resp.json();
    if (resp.status === 200) {
      setCookie("accessToken", data.accessToken, { maxAge: 60 * 60 });
      router.push("/");
    } else {
      alert(`Failed to sign in: ${data.error || "Unknown error"}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 p-6">
      <form
        onSubmit={handleOnSubmit}
        className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full flex flex-col gap-6"
      >
        <h1 className="text-3xl font-semibold text-center text-indigo-700 mb-4">
          Sign In
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md py-3 transition-colors"
        >
          Sign In
        </button>

        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="text-indigo-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
