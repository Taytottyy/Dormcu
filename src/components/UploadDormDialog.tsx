import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Plus, Upload } from "lucide-react";
import { useState } from "react";

export function UploadDormDialog() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Share Your Room
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Share Your Dorm Room</DialogTitle>
          <DialogDescription>
            Upload photos of your dorm and inspire your classmates with your design!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">Room Photo</Label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG up to 10MB
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="building">Dorm Building</Label>
            <Input
              id="building"
              placeholder="e.g., Morrison Hall"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="room">Room Number</Label>
            <Input id="room" placeholder="e.g., 304B" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Tell us about your room setup, inspiration, or tips..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="e.g., minimalist, cozy, budget-friendly (comma separated)"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Post</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
