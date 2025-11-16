import { Button } from "./shadcn-io/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./shadcn-io/dialog";
import { CheckCircle } from "lucide-react";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export function SuccessDialog({ open, onClose, message }: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm text-center p-6 rounded-lg bg-white shadow-lg">
        <DialogHeader>
          <CheckCircle className="mx-auto w-12 h-12 text-green-500" />
          <DialogTitle className="mt-4 text-xl font-semibold text-text-color text-center">
            {message}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6">
          <Button
            onClick={onClose}
            className="bg-button-color! w-[150px] !hover:bg-blue-600 cursor-pointer rounded-xl!"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
