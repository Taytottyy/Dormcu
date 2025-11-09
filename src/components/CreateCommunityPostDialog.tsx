import { useState } from "react";
import { X, Calendar, Package, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface CreateCommunityPostDialogProps {
  onClose: () => void;
}

export function CreateCommunityPostDialog({ onClose }: CreateCommunityPostDialogProps) {
  const [postType, setPostType] = useState<"event" | "borrow" | "buy" | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    eventTime: "",
    location: "",
    itemName: "",
    duration: "",
    price: "",
    condition: "Good",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle post creation logic here
    console.log("Creating post:", { postType, ...formData });
    onClose();
  };

  if (!postType) {
    return (
      <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
        <div className="min-h-screen">
          {/* Header */}
          <div className="sticky top-0 bg-background border-b px-4 py-3 flex items-center justify-between">
            <h2>Create Community Post</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Post Type Selection */}
          <div className="p-4 space-y-4">
            <p className="text-muted-foreground mb-4">
              What would you like to share with your dorm community?
            </p>

            <button
              onClick={() => setPostType("event")}
              className="w-full p-4 border-2 rounded-lg hover:border-primary transition-colors text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-1">Post an Event</h3>
                  <p className="text-sm text-muted-foreground">
                    Share social gatherings, study groups, or activities happening in your dorm
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setPostType("buy")}
              className="w-full p-4 border-2 rounded-lg hover:border-primary transition-colors text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="mb-1">Sell an Item</h3>
                  <p className="text-sm text-muted-foreground">
                    List items you want to sell to other students in your dorm community
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setPostType("borrow")}
              className="w-full p-4 border-2 rounded-lg hover:border-primary transition-colors text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="mb-1">Borrow Request</h3>
                  <p className="text-sm text-muted-foreground">
                    Ask to borrow items from other students in your dorm community
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPostType(null)}
            >
              <X className="w-5 h-5" />
            </Button>
            <h2>
              {postType === "event" ? "Create Event" : postType === "buy" ? "Sell an Item" : "Borrow Request"}
            </h2>
          </div>
          <Button type="submit" form="community-post-form">
            Post
          </Button>
        </div>

        {/* Form */}
        <form id="community-post-form" onSubmit={handleSubmit} className="p-4 space-y-4">
          {postType === "event" && (
            <>
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Movie Night, Study Group"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell people what to expect..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventDate">Date</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) =>
                      setFormData({ ...formData, eventDate: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="eventTime">Time</Label>
                  <Input
                    id="eventTime"
                    type="time"
                    value={formData.eventTime}
                    onChange={(e) =>
                      setFormData({ ...formData, eventTime: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Morrison Hall Common Room"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
              </div>
            </>
          )}

          {postType === "buy" && (
            <>
              <div>
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  placeholder="What are you selling?"
                  value={formData.itemName}
                  onChange={(e) =>
                    setFormData({ ...formData, itemName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) =>
                      setFormData({ ...formData, condition: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Like New">Like New</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the item, its condition, and why you're selling it..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="photos">Photos (Optional)</Label>
                <Input
                  id="photos"
                  type="file"
                  accept="image/*"
                  multiple
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Add photos to help sell your item faster
                </p>
              </div>
            </>
          )}

          {postType === "borrow" && (
            <>
              <div>
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  placeholder="What do you need to borrow?"
                  value={formData.itemName}
                  onChange={(e) =>
                    setFormData({ ...formData, itemName: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Why do you need it and any other details..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="duration">How long do you need it?</Label>
                <Input
                  id="duration"
                  placeholder="e.g., Few hours, 1 day, 3 days"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  required
                />
              </div>
            </>
          )}

          <div className="pt-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              Your post will be visible to students in your dorm community.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
