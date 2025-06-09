"use client";

import Chat from "@/components/Chat";
import socket from "@/config/socket";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [echo, setEcho] = useState("");
  const [echos, setEchos] = useState<string[]>([]);

  const [groupMsg, setGroupMsg] = useState("");
  const [groupMsgs, setGroupMsgs] = useState<string[]>([]);

  const [roomId, setRoomId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showChat, setShowChat] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("echoReciever", echo);
    setEcho("");
  };

  const handleGroupMessages = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("groupChat", groupMsg);
    setGroupMsg("");
  };

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("joinRoom", { roomId, userEmail });
    setShowChat(true);
  };

  useEffect(() => {
    socket.on("echoSender", (data) => {
      setEchos((prev) => [...prev, data]);
    });

    socket.on("groupChat", (data) => {
      setGroupMsgs((prev) => [...prev, data]);
    });

    return () => {
      socket.off("echoSender");
      socket.off("groupChat");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100 p-8 flex flex-col items-center">
      {showChat ? (
        <Chat roomId={roomId} userEmail={userEmail} />
      ) : (
        <div className="w-full max-w-3xl space-y-10">
          <h1 className="text-4xl font-extrabold text-center text-indigo-800 drop-shadow-lg mb-6">
            🌐 Real-Time Chat App
          </h1>

          <section className="bg-white p-8 rounded-2xl shadow-xl ring-1 ring-indigo-200 hover:ring-indigo-300 transition">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-700 border-b border-indigo-100 pb-2">
              Echo Chat
            </h2>
            <form onSubmit={onSubmit} className="flex gap-3">
              <input
                type="text"
                placeholder="Type echo message"
                className="flex-1 p-3 border border-indigo-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
                value={echo}
                onChange={(e) => setEcho(e.target.value)}
                aria-label="Echo message input"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 shadow-md transition"
              >
                Send
              </button>
            </form>
            <div className="mt-6 max-h-44 overflow-y-auto space-y-2">
              {echos.length === 0 ? (
                <p className="text-indigo-300 italic text-center select-none">
                  No echo messages yet...
                </p>
              ) : (
                echos.map((e, i) => (
                  <div
                    key={i}
                    className="bg-indigo-50 text-indigo-800 rounded-lg px-4 py-2 shadow-sm break-words"
                  >
                    {e}
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-xl ring-1 ring-green-200 hover:ring-green-300 transition">
            <h2 className="text-2xl font-semibold mb-6 text-green-700 border-b border-green-100 pb-2">
              Group Chat
            </h2>
            <form onSubmit={handleGroupMessages} className="flex gap-3">
              <input
                type="text"
                placeholder="Group message"
                className="flex-1 p-3 border border-green-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-green-300 transition"
                value={groupMsg}
                onChange={(e) => setGroupMsg(e.target.value)}
                aria-label="Group message input"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 shadow-md transition"
              >
                Send
              </button>
            </form>
            <div className="mt-6 max-h-44 overflow-y-auto space-y-2">
              {groupMsgs.length === 0 ? (
                <p className="text-green-300 italic text-center select-none">
                  No group messages yet...
                </p>
              ) : (
                groupMsgs.map((e, i) => (
                  <div
                    key={i}
                    className="bg-green-50 text-green-800 rounded-lg px-4 py-2 shadow-sm break-words"
                  >
                    {e}
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Join Room Section */}
          <section className="bg-white p-8 rounded-2xl shadow-xl ring-1 ring-purple-300 hover:ring-purple-400 transition">
            <h2 className="text-2xl font-semibold mb-6 text-purple-700 border-b border-purple-200 pb-2">
              Join a Room
            </h2>
            <form onSubmit={handleJoinRoom} className="space-y-6">
              <input
                type="text"
                placeholder="Room ID"
                className="w-full p-3 border border-purple-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                required
                aria-label="Room ID input"
              />
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-purple-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
                aria-label="User email input"
              />
              <button
                type="submit"
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 shadow-md transition"
              >
                Join Chat Room
              </button>
              <input type="text" />
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
