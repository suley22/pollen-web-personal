import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function JobDetailsDialog({ job, onClose, isOpen }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">HOLA</DialogContent>
    </Dialog>
  );
}
