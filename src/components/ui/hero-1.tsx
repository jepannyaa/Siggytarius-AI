"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

const teamMembers = [
  {
    name: "jepannyaa",
    image: "/jepannyaa.jpg",
    role: "Ritual Wizard 🔮",
  },
  {
    name: "tutubear",
    image: "/tutubear.jpg",
    role: "Chaos Engineer 🐻",
  },
  {
    name: "babasss",
    image: "/babasss.jpg",
    role: "Siggy Whisperer 🐱",
  },
];

const Hero1 = () => {
  return (
    <div className="h-screen text-white flex flex-col relative overflow-y-auto overflow-x-hidden overscroll-none">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-black/55" />

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center pt-24 pb-8">
        <div className="max-w-3xl mx-auto space-y-6 bg-black/50 backdrop-blur-sm rounded-3xl px-10 py-12 border border-white/10">
          {/* Badge */}
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 flex items-center gap-2 w-fit">
              <span className="text-xs flex items-center gap-2">
                <span className="bg-black/40 p-1 rounded-full">✨</span>
                Powered by Ritual Network · Groq AI
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
            Meet{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
              Siggytarius
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
            Your AI-powered black cat guide to everything Ritual Network.
            Ask anything — from docs to onchain AI infrastructure.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center pt-2">
            <Link
              href="/chat"
              className="group flex items-center gap-3 bg-white text-black hover:bg-gray-100 rounded-full px-8 py-4 text-base font-bold transition-all duration-200 shadow-lg shadow-white/10 hover:shadow-white/20 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Start AI Chat
            </Link>
          </div>

          {/* Suggestion pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4 max-w-2xl mx-auto">
            {[
              "What is Ritual Network?",
              "How does Infernet work?",
              "Explain onchain AI",
              "Ritual roadmap",
              "How to build with Ritual?",
            ].map((pill) => (
              <Link
                key={pill}
                href={`/chat`}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm transition-colors"
              >
                {pill}
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Team Section */}
      <section className="relative z-10 px-4 pb-8">
        <div className="max-w-3xl mx-auto text-center space-y-8 bg-black/50 backdrop-blur-sm rounded-3xl px-10 py-10 border border-white/10">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Built by</p>
            <h2 className="text-2xl font-bold text-white">The Team</h2>
          </div>

          <div className="flex justify-center gap-10 sm:gap-16 flex-wrap">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center gap-3 group cursor-pointer">
                {/* Circle avatar with zoom-in on hover */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 ring-2 ring-white/10 group-hover:ring-white/50 group-hover:border-white/40 transition-all duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-gray-200 transition-colors">@{member.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-5 text-xs text-gray-300">
        <div className="inline-block bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2">
          © 2026 Siggy · Built on Ritual Network
        </div>
      </footer>
    </div>
  );
};

export { Hero1 };
