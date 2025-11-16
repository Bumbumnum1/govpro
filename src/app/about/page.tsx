"use client";
import Image from "next/image";

import Header from "../components/ui/Header";

export default function About() {
  return (
    <div className="w-full h-screen flex flex-col text-text-color  overflow-y-auto text-sm bg-white ">
      <Header />
      <div className="flex flex-row items-start justify-between flex-1  pl-5 pr-5">
        <div className="mt-28 pl-7 flex flex-1 ">
          <div className="flex flex-col gap-6 ">
            <h1 className="text-5xl font-medium">About NexusSec</h1>

            <p className="text-3xl leading-relaxed">
              A Secure Platform
              <br />
              For Reporting Suspicious
              <br />
              Government Sites In The Philippines
            </p>
          </div>
        </div>
        <div className="">
          <Image
            src="/hero2.svg"
            alt="Character Illustration"
            width={600}
            height={450}
          />
        </div>
      </div>
    </div>
  );
}
