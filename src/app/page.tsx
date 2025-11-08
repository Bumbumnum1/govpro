"use client";
import { useState } from "react";
import { Input } from "./components/ui/input";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  return (
    <div className="w-full h-screen flex flex-col text-[#383838] p-5 font-lexend overflow-y-auto text-sm bg-white">
      <div className="flex items-center justify-between mb-5">
        <p className="text-xl font-semibold">NexusSec</p>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center">
        <div className="relative w-[500px] overflow-hidden gap-5">
          <label>Title</label>
          <Input
            name="title"
            className="pl-5 w-full"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Description</label>
          <Input
            name="description"
            className="pl-5 w-full"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex items-end justify-end">
            <button
              type="submit"
              className="mx-2 px-3 py-2 cursor-pointer bg-red-500 hover:bg-white hover:text-red-500 border border-red-500 transition-all ease-in-out duration-200 rounded-md text-white mt-5"
            >
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
