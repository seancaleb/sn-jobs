import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type UnsavedChangesDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
};

const UnsavedChangesDialog = ({ isOpen, setIsOpen, onClose }: UnsavedChangesDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Discard changes?</DialogTitle>
          <DialogDescription>
            Are you sure you want to discard the changes you made?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={onClose}>
            Discard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnsavedChangesDialog;
