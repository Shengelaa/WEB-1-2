"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      alert("Please fill all fields.");
      return;
    }

    const resp = await fetch("http://localhost:4000/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        fullName,
      }),
    });

    const data = await resp.json();
    if (resp.status === 201) {
      alert("Account created successfully! Please sign in.");
      router.push("/auth/sign-in");
    } else {
      alert(`Error: ${data.error || "Unable to sign up"}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 p-6">
      <form
        onSubmit={handleOnSubmit}
        className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full flex flex-col gap-6"
      >
        <h1 className="text-3xl font-semibold text-center text-indigo-700 mb-4">
          Sign Up
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

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
          Sign Up
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="text-indigo-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
