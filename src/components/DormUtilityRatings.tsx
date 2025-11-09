import { Star, X, Lightbulb, ChefHat, Bath, PaintBucket, Package, Ruler } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface UtilityRating {
  category: string;
  rating: number;
  icon: React.ReactNode;
  description: string;
}

interface DormUtilityRatingsProps {
  dormBuilding: string;
  roomNumber: string;
  onClose: () => void;
}

const ratingCategories = [
  {
    category: "Lighting",
    icon: <Lightbulb className="w-5 h-5" />,
    description: "Natural light, ceiling lights, and overall brightness"
  },
  {
    category: "Kitchen",
    icon: <ChefHat className="w-5 h-5" />,
    description: "Appliances, counter space, and storage"
  },
  {
    category: "Bathroom",
    icon: <Bath className="w-5 h-5" />,
    description: "Cleanliness, fixtures, and water pressure"
  },
  {
    category: "Walls",
    icon: <PaintBucket className="w-5 h-5" />,
    description: "Condition, paint quality, and decoration options"
  },
  {
    category: "Storage",
    icon: <Package className="w-5 h-5" />,
    description: "Closet space, shelves, and built-in storage"
  },
  {
    category: "Space",
    icon: <Ruler className="w-5 h-5" />,
    description: "Room size, layout, and furniture arrangement"
  }
];

export function DormUtilityRatings({ dormBuilding, roomNumber, onClose }: DormUtilityRatingsProps) {
  // Check if this is a freshman dorm (no kitchen)
  const freshmanDorms = ["Wallach Hall", "Carman Hall", "Furnald Hall", "Wien Hall"];
  const isFreshmanDorm = freshmanDorms.includes(dormBuilding);

  // Mock ratings - in a real app, these would come from the database
  const [ratings] = useState<UtilityRating[]>(
    ratingCategories.map(cat => ({
      ...cat,
      rating: Math.floor(Math.random() * 3) + 3 // Random ratings between 3-5
    }))
  );

  // Calculate overall rating excluding kitchen for freshman dorms
  const ratingsForAverage = isFreshmanDorm 
    ? ratings.filter(r => r.category !== "Kitchen")
    : ratings;
  const overallRating = (ratingsForAverage.reduce((sum, r) => sum + r.rating, 0) / ratingsForAverage.length).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h2>Utility Ratings</h2>
            <p className="text-sm text-muted-foreground">
              {dormBuilding} • Room {roomNumber}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Overall Rating */}
      <div className="px-4 py-6 border-b bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="text-center">
          <div className="text-4xl mb-2">{overallRating}</div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 ${
                  star <= Math.round(Number(overallRating))
                    ? "fill-golden text-golden"
                    : "text-muted-foreground"
                }`}
                style={star <= Math.round(Number(overallRating)) ? { color: '#F5C23D', fill: '#F5C23D' } : {}}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Overall Rating</p>
        </div>
      </div>

      {/* Individual Category Ratings */}
      <div className="px-4 py-6">
        <h3 className="mb-4">Category Breakdown</h3>
        <div className="space-y-6">
          {ratings.map((rating, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {rating.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span>{rating.category}</span>
                    {isFreshmanDorm && rating.category === "Kitchen" ? (
                      <div className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                        No Kitchen
                      </div>
                    ) : (
                      <span className="text-sm">{rating.rating}.0</span>
                    )}
                  </div>
                  {isFreshmanDorm && rating.category === "Kitchen" ? (
                    <p className="text-xs text-muted-foreground">
                      Communal kitchen available on floor
                    </p>
                  ) : (
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= rating.rating
                              ? "fill-golden text-golden"
                              : "text-muted-foreground"
                          }`}
                          style={star <= rating.rating ? { color: '#F5C23D', fill: '#F5C23D' } : {}}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground ml-[52px]">
                {isFreshmanDorm && rating.category === "Kitchen" 
                  ? "Freshman dorms have shared kitchens on each floor"
                  : rating.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Review Section */}
      <div className="px-4 py-6 border-t bg-muted/30">
        <h3 className="mb-3">Student Reviews</h3>
        <div className="space-y-4">
          {/* Sample Review 1 */}
          <div className="bg-background rounded-lg p-4 border">
            <div className="flex items-center gap-2 mb-2">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Review1" 
                alt="Reviewer" 
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm">Emma S.</p>
                <p className="text-xs text-muted-foreground">Lived here Fall 2024</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3" style={{ color: '#F5C23D', fill: '#F5C23D' }} />
                <span className="text-sm">4.5</span>
              </div>
            </div>
            <p className="text-sm">
              Great natural lighting and the bathroom is surprisingly spacious! Storage could be better but overall a solid room.
            </p>
          </div>

          {/* Sample Review 2 */}
          <div className="bg-background rounded-lg p-4 border">
            <div className="flex items-center gap-2 mb-2">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Review2" 
                alt="Reviewer" 
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm">Michael T.</p>
                <p className="text-xs text-muted-foreground">Current resident</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3" style={{ color: '#F5C23D', fill: '#F5C23D' }} />
                <span className="text-sm">4.0</span>
              </div>
            </div>
            <p className="text-sm">
              The kitchen area is decent for a dorm. Walls are in good condition and easy to hang posters on. Would recommend!
            </p>
          </div>
        </div>
      </div>

      {/* Rate This Room Button */}
      <div className="px-4 py-6 border-t">
        <Button className="w-full">Rate This Room</Button>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Share your experience to help future students
        </p>
      </div>
    </div>
  );
}