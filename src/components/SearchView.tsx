import { Input } from "./ui/input";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";

const popularSearches = [
  "minimalist",
  "cozy",
  "plants",
  "string lights",
  "study space",
  "colorful",
  "budget friendly",
  "scandinavian",
];

const recentSearches = ["Morrison Hall", "cozy setup", "desk organization"];

export function SearchView() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Search Header */}
      <div className="sticky top-0 bg-background border-b px-4 py-3 z-10">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search rooms, styles, students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Recent Searches */}
        {!searchQuery && (
          <>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3>Recent</h3>
                <Button variant="ghost" size="sm">
                  Clear
                </Button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-3 w-full text-left py-2 hover:bg-muted rounded-lg px-2"
                  >
                    <Search className="w-5 h-5 text-muted-foreground" />
                    <span>{search}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Searches */}
            <div>
              <h3 className="mb-3">Popular</h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div className="text-center py-12 text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Search for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
