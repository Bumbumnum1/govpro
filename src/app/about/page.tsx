"use client";
import Image from "next/image";
import Link from "next/link";


export default function About() {

  return (
    <div className="w-full h-screen flex flex-col text-[#52575D] p-5 overflow-y-auto text-sm bg-white font-poppins">
      <div className="flex items-center justify-between mb-5 pl-20 pt-10">
        <div className="text-xl font-medium pt-[50px] flex flex-row gap-25 items-center">
          <div>
            <Image src="/logo.svg" alt="logo" width={190} height={65} />
          </div>
          <div className="flex flex-row gap-20">
            <div>
              <Link href="/" className="cursor-pointer">
                Report
              </Link>
            </div>

            <div>
              <label className="cursor-pointer font-semibold">About</label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-full px-40 mt-10">
        <div>
          <div className="flex flex-col gap-3 max-w-[700px]">
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
        <div className="w-[550px]">
          <Image
            src="/hero2.svg"
            alt="Character Illustration"
            width={450}
            height={450}
          />
        </div>
      </div>

    </div>
  );
}
