"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image"; // ✅ import this for <Image />

type User = {
  id: number;
  fullName: string;
  email: string;
  avatar: string; // ✅ add avatar
};

export default function Home() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState<any>();

  const getAllUsers = async () => {
    try {
      const resp = await fetch("http://localhost:4000/users");
      const data = await resp.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("avatar", img[0]);

    const resp = await fetch("http://localhost:4000/users", {
      method: "POST",
      body: formData,
    });

    if (resp.status === 201) {
      await getAllUsers();
    }
  };

  return (
    <div className="bg-white text-black">
      <form className="mt-8" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border-2 w-[200px] h-[30px] "
          placeholder="full name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="text"
          className="border-2 w-[200px] h-[30px] "
          placeholder="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="file" onChange={(e) => setImg(e.target.files)} />
        <button>create User</button>
      </form>
      {users?.length ? (
        users.map((el) => (
          <div key={el.id}>
            <h1>{el.fullName}</h1>
            <Image src={el.avatar} alt={el.fullName} width={100} height={100} />
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
