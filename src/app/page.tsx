"use client";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/shadcn-io/dialog";
import { Input } from "./components/ui/input";

export default function Home() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleSubmit = () => {
    console.log("clarence bading");
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const closeModal = () => {
    setOpenDialog(false);
  };
  return (
    <div className="w-full h-screen flex flex-col text-[#52575D] p-5 overflow-y-auto text-sm bg-white font-poppins">
      <div className="flex items-center justify-between mb-5 pl-20 pt-10">
        <div className="text-xl font-medium pt-[50px] flex flex-row gap-25 items-center">
          <div>
            <Image src="/logo.svg" alt="logo" width={190} height={65} />
          </div>
          <div className="flex flex-row gap-20">
            <div>
              <label className="cursor-pointer font-semibold">Report</label>
            </div>

            <div>
              <Link
                href="/about"
                className="cursor-pointer hover:font-semibold"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-full px-40 mt-10">
        <div>
          <div className="flex flex-col gap-3 max-w-[700px]">
            <h1 className="text-5xl font-medium">Welcome To NexusSec</h1>

            <p className="text-3xl leading-relaxed">
              A Secure Platform
              <br />
              For Reporting Suspicious
              <br />
              Government Sites In The Philippines
            </p>

            <div className="flex flex-row items-center gap-5 mt-5">
              <button
                onClick={handleOpenDialog}
                className="w-[200px] bg-[#0075FF] text-xl rounded-xl text-white px-6 py-2 cursor-pointer hover:bg-[#4E9AF4]"
              >
                Report
              </button>

              <button className="underline text-lg cursor-pointer hover:font-semibold">
                See How It Works 🠖
              </button>
            </div>
          </div>
        </div>
        <div className="w-[550px]">
          <Image
            src="/hero.svg"
            alt="Character Illustration"
            width={450}
            height={450}
          />
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={() => closeModal()}>
        <DialogContent
          className="p-0 cursor-default bg-white"
          aria-describedby={undefined}
          showCloseButton={false}
        >
          <div>
            <div className="w-full text-end">
              <DialogClose asChild>
                <button
                  type="button"
                  onClick={() => closeModal()}
                  className="p-2 rounded-md hover:bg-gray-100 cursor-pointer "
                >
                  <X className="w-4 h-4" />
                </button>
              </DialogClose>
            </div>
            <DialogHeader className="flex flex-row items-center px-5 border-b pb-2">
              <DialogTitle className="w-full text-[16px] flex flex-row items-center gap-2 text-[#3e3e3e] font-poppins text-lg"> Report Gay </DialogTitle>
            </DialogHeader>
          </div>
          <form
            onSubmit={handleSubmit}
            className="px-5 pb-5 flex flex-col gap-3"
          >
            <div className="flex flex-col items-start gap-2 font-poppins text-[#3e3e3e] text-sm">
              <p className="font-medium">What is the issue?</p>
              <Input
                type="text"
                required
                value={"gay"}
                placeholder="What is the issue"
                onChange={(e) => e.target.value}
              />
            </div>
            <div className="flex flex-row justify-end">
              <button
                type="submit"
                className="font-poppins text-sm px-3 py-2 rounded-lg bg-[#0075FF] border border-[#0075FF] hover:bg-[#4E9AF4] cursor-pointer text-white"
              >
                Next
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
