import { Heart, MessageCircle, Bookmark, Share2, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { DormUtilityRatings } from "./DormUtilityRatings";
import { useState } from "react";

interface DormCardProps {
  id: string;
  userName: string;
  userAvatar?: string;
  dormBuilding: string;
  roomNumber: string;
  imageUrl?: string;
  images?: string[];
  description: string;
  likes: number;
  comments: number;
  tags: string[];
  timeAgo: string;
}

export function DormCard({
  userName,
  userAvatar,
  dormBuilding,
  roomNumber,
  imageUrl,
  images,
  description,
  likes: initialLikes,
  comments,
  tags,
  timeAgo,
}: DormCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [showRatings, setShowRatings] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use images array if provided, otherwise fall back to single imageUrl
  const imageList = images || (imageUrl ? [imageUrl] : []);
  const hasMultipleImages = imageList.length > 1;

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  // Mock overall rating - in a real app, this would come from the database
  const overallRating = (Math.random() * 1.5 + 3.5).toFixed(1);

  return (
    <>
      <div className="bg-background border-b">
        {/* User Header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={userAvatar} />
              <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{userName}</p>
              <p className="text-sm text-muted-foreground">
                {dormBuilding} • Room {roomNumber}
              </p>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">{timeAgo}</span>
        </div>

        {/* Image */}
        <div className="relative aspect-[4/3] max-h-64 overflow-hidden bg-muted rounded-lg mx-4">
          {imageList.length > 0 && (
            <ImageWithFallback
              src={imageList[currentImageIndex]}
              alt={`${userName}'s dorm room`}
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button
                onClick={goToPrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {hasMultipleImages && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {imageList.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-white w-4"
                      : "bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 px-2"
                onClick={handleLike}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isLiked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                <span>{likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 px-2">
                <MessageCircle className="w-5 h-5" />
                <span>{comments}</span>
              </Button>
              <Button variant="ghost" size="sm" className="px-2">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="px-2"
              onClick={handleSave}
            >
              <Bookmark
                className={`w-5 h-5 ${
                  isSaved ? "fill-current text-blue-600" : ""
                }`}
              />
            </Button>
          </div>

          {/* Description */}
          <p className="text-sm mb-2">{description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Utility Ratings Preview */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-3 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" style={{ color: '#F5C23D', fill: '#F5C23D' }} />
                  <span className="text-sm">{overallRating}</span>
                </div>
                <span className="text-sm text-muted-foreground">Room Utilities</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-primary hover:text-primary"
                onClick={() => setShowRatings(true)}
              >
                View Ratings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Utility Ratings Dialog */}
      {showRatings && (
        <DormUtilityRatings
          dormBuilding={dormBuilding}
          roomNumber={roomNumber}
          onClose={() => setShowRatings(false)}
        />
      )}
    </>
  );
}