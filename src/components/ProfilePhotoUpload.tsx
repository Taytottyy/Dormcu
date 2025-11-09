import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Camera, Upload } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ProfilePhotoUploadProps {
  currentPhoto?: string;
  userName: string;
  onPhotoChange?: (photoUrl: string) => void;
}

export function ProfilePhotoUpload({
  currentPhoto,
  userName,
  onPhotoChange,
}: ProfilePhotoUploadProps) {
  const [photo, setPhoto] = useState(currentPhoto);
  const [showDialog, setShowDialog] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setShowDialog(true);
    }
  };

  const handleUpload = () => {
    if (previewUrl) {
      setPhoto(previewUrl);
      onPhotoChange?.(previewUrl);
      setShowDialog(false);
    }
  };

  const handleCancel = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setShowDialog(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <div className="relative inline-block">
        <Avatar className="w-20 h-20">
          <AvatarImage src={photo} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <button
          onClick={triggerFileInput}
          className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow border-2 border-background"
        >
          <Camera className="w-4 h-4 text-white" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Preview Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Update Profile Photo</DialogTitle>
            <DialogDescription>
              This will be your new profile photo
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={previewUrl || photo} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={handleUpload} className="flex-1 gap-2">
                <Upload className="w-4 h-4" />
                Upload
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
