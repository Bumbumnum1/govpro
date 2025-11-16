"use client";

import Image from "next/image";
import { useState } from "react";
import FirstForm from "./components/ui/Form";
import Header from "./components/ui/Header";
import { SuccessDialog } from "./components/ui/SuccessDialog";

export default function Home() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const closeModal = () => {
    setOpenDialog(false);
  };
  return (
    <div className="w-full h-screen flex flex-col text-text-color  overflow-y-auto text-sm bg-white ">
      <Header></Header>

      <div className="flex flex-row items-start justify-between flex-1    pl-5 pr-5">
        <div className="mt-28 pl-7 flex flex-1 ">
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-medium">Welcome To NexusSec</h1>
            <SuccessDialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              message="Successfully Reported!"
            />
            ;
            <p className="text-3xl leading-relaxed">
              A Secure Platform
              <br />
              For Reporting Suspicious
              <br />
              Government Sites In The Philippines
            </p>
            <div className="flex flex-row items-center gap-6 mt-10">
              <button
                onClick={handleOpenDialog}
                className="w-[200px] bg-button-color text-xl rounded-xl text-white px-6 py-2 cursor-pointer hover:bg-[#4E9AF4]"
              >
                Report
              </button>

              <button className="underline text-lg cursor-pointer hover:font-semibold">
                See How It Works 🠖
              </button>
            </div>
          </div>
        </div>
        <div className=" pt-10">
          <Image
            src="/hero.svg"
            alt="Character Illustration"
            width={600}
            height={450}
          />
        </div>
      </div>
      <FirstForm dialog={openDialog} handleModal={closeModal} />
    </div>
  );
}
