import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { LogOut } from 'lucide-react';
import React from 'react'
import { Button } from "./ui/button";
import { signOut } from 'next-auth/react';

function DialogBox() {
  return (
      <div className="font-mono">
<Dialog>
  <DialogTrigger><LogOut /></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        You would require to login again
      </DialogDescription>
    </DialogHeader>
    <Button onClick={() => signOut()}> Log Out</Button>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default DialogBox