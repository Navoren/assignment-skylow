'use client'
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex inset-x-0 bottom-0 fixed justify-center m-3 mb-5">
      <Input
        placeholder="Enter your message here"
        className="flex rounded-full w-1/2 bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
"
        />
        <Button className="rounded-full mx-3" type="submit" variant="secondary"><Send/></Button>
      </div>
        </div>
  );
}
