import { X } from "lucide-react";
import { Input } from "./input";
import { Dialog, DialogContent,DialogClose,DialogHeader,DialogTitle } from "./shadcn-io/dialog";


interface FirstFormType{
   dialog:boolean,
   handleModal:() => void,
   handleSubmit:()=> void
}
export default function FirstForm({dialog,handleModal,handleSubmit}:FirstFormType){
   return      <Dialog open={dialog} onOpenChange={() => handleModal()}>
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
                  onClick={() => handleModal()}
                  className="p-2 rounded-md hover:bg-gray-100 cursor-pointer "
                >
                  <X className="w-4 h-4" />
                </button>
              </DialogClose>
            </div>
            <DialogHeader className="flex flex-row items-center px-5 border-b pb-2 ">
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
} 