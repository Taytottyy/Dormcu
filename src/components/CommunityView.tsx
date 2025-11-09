import { Calendar, Clock, MapPin, Heart, MessageCircle, Share2, Plus, Package, DollarSign, Tag } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface Event {
  id: string;
  type: "event";
  userName: string;
  userAvatar?: string;
  dormBuilding: string;
  title: string;
  description: string;
  eventDate: string;
  eventTime: string;
  location: string;
  attendees: number;
  comments: number;
  timeAgo: string;
}

interface BorrowRequest {
  id: string;
  type: "borrow";
  userName: string;
  userAvatar?: string;
  dormBuilding: string;
  itemName: string;
  description: string;
  duration: string;
  comments: number;
  timeAgo: string;
}

interface BuyListing {
  id: string;
  type: "buy";
  userName: string;
  userAvatar?: string;
  dormBuilding: string;
  itemName: string;
  price: number;
  description: string;
  condition: "Like New" | "Good" | "Fair";
  images: string[];
  comments: number;
  timeAgo: string;
  isSold: boolean;
}

type CommunityPost = Event | BorrowRequest | BuyListing;

// Mock data
const communityPosts: CommunityPost[] = [
  {
    id: "buy1",
    type: "buy",
    userName: "Jordan Martinez",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    dormBuilding: "Carman Hall",
    itemName: "Mini Fridge - Perfect for Dorm",
    price: 60,
    description: "Compact mini fridge in great condition. 1.7 cu ft capacity. Upgrading to a bigger one so selling this! Kept drinks cold all year.",
    condition: "Good",
    images: ["https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500"],
    comments: 4,
    timeAgo: "1h ago",
    isSold: false,
  },
  {
    id: "e1",
    type: "event",
    userName: "Alex Chen",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexC",
    dormBuilding: "Morrison Hall",
    title: "Movie Night - Barbie",
    description: "Join us for a cozy movie night in the common room! Bringing popcorn and snacks 🍿",
    eventDate: "Nov 12, 2025",
    eventTime: "7:00 PM",
    location: "Morrison Hall Common Room",
    attendees: 14,
    comments: 8,
    timeAgo: "2h ago",
  },
  {
    id: "buy2",
    type: "buy",
    userName: "Emma Wilson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    dormBuilding: "John Jay Hall",
    itemName: "Desk Lamp with USB Port",
    price: 20,
    description: "LED desk lamp with adjustable brightness and USB charging port. Barely used, moving out next semester.",
    condition: "Like New",
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500"],
    comments: 2,
    timeAgo: "3h ago",
    isSold: false,
  },
  {
    id: "b1",
    type: "borrow",
    userName: "Jamie Lee",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
    dormBuilding: "East Campus",
    itemName: "Mini Fridge",
    description: "Need to borrow a mini fridge for the weekend while mine is being repaired. Can pick up from your dorm!",
    duration: "3 days",
    comments: 5,
    timeAgo: "4h ago",
  },
  {
    id: "buy3",
    type: "buy",
    userName: "Ryan Park",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
    dormBuilding: "Wien Hall",
    itemName: "Textbooks - Intro to Psychology",
    price: 35,
    description: "PSYCH 1001 textbook bundle. Some highlighting but all pages intact. Saved me $150 buying new!",
    condition: "Good",
    images: ["https://images.unsplash.com/photo-1589998059171-988d887df646?w=500"],
    comments: 6,
    timeAgo: "5h ago",
    isSold: false,
  },
  {
    id: "e2",
    type: "event",
    userName: "Maya Patel",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    dormBuilding: "West Tower",
    title: "Study Group - ECON 101",
    description: "Weekly study session for midterm prep. All welcome! 📚",
    eventDate: "Nov 10, 2025",
    eventTime: "3:00 PM",
    location: "West Tower Lounge",
    attendees: 8,
    comments: 12,
    timeAgo: "6h ago",
  },
  {
    id: "buy4",
    type: "buy",
    userName: "Lisa Chen",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    dormBuilding: "Furnald Hall",
    itemName: "Coffee Maker - Keurig K-Mini",
    price: 40,
    description: "Compact single-serve coffee maker. Works perfectly, just prefer making coffee in the dining hall now.",
    condition: "Like New",
    images: ["https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500"],
    comments: 8,
    timeAgo: "7h ago",
    isSold: false,
  },
  {
    id: "b2",
    type: "borrow",
    userName: "Chris Williams",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris",
    dormBuilding: "John Jay",
    itemName: "Vacuum Cleaner",
    description: "Just need it for a quick clean before my parents visit tomorrow. Will return same day!",
    duration: "Few hours",
    comments: 3,
    timeAgo: "8h ago",
  },
  {
    id: "e3",
    type: "event",
    userName: "Taylor Smith",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
    dormBuilding: "Carmen",
    title: "Game Night Tournament",
    description: "Super Smash Bros tournament with prizes! Sign up in the comments 🎮",
    eventDate: "Nov 15, 2025",
    eventTime: "8:00 PM",
    location: "Carmen Rec Room",
    attendees: 22,
    comments: 18,
    timeAgo: "1d ago",
  },
  {
    id: "buy5",
    type: "buy",
    userName: "Mike Thompson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    dormBuilding: "McBain Hall",
    itemName: "Dorm Room Rug - 5x7",
    price: 30,
    description: "Gray geometric pattern rug. Really ties the room together! Just graduated and moving out.",
    condition: "Good",
    images: ["https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=500"],
    comments: 3,
    timeAgo: "1d ago",
    isSold: false,
  },
  {
    id: "b3",
    type: "borrow",
    userName: "Sam Johnson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
    dormBuilding: "Wien",
    itemName: "Iron & Ironing Board",
    description: "Have a job interview tomorrow and need to iron my suit. Can pick up anytime today!",
    duration: "1 day",
    comments: 7,
    timeAgo: "1d ago",
  },
  {
    id: "buy6",
    type: "buy",
    userName: "Sarah Kim",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    dormBuilding: "Wallach Hall",
    itemName: "Portable Fan - Perfect for Summer",
    price: 15,
    description: "Oscillating desk fan with 3 speed settings. Kept my room cool last summer! Moving to AC dorm.",
    condition: "Good",
    images: ["https://images.unsplash.com/photo-1632832430485-dff6c8ec2782?w=500"],
    comments: 1,
    timeAgo: "2d ago",
    isSold: false,
  },
];

function EventCard({ event }: { event: Event }) {
  const [isInterested, setIsInterested] = useState(false);
  const [attendees, setAttendees] = useState(event.attendees);

  const handleInterested = () => {
    if (isInterested) {
      setAttendees(attendees - 1);
    } else {
      setAttendees(attendees + 1);
    }
    setIsInterested(!isInterested);
  };

  return (
    <div className="bg-background border-b p-4">
      {/* User Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={event.userAvatar} />
            <AvatarFallback>{event.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{event.userName}</p>
            <p className="text-sm text-muted-foreground">{event.dormBuilding}</p>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{event.timeAgo}</span>
      </div>

      {/* Event Content */}
      <div className="mb-3">
        <div className="flex items-start gap-2 mb-2">
          <Calendar className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
          <h3 className="font-semibold">{event.title}</h3>
        </div>
        <p className="text-sm mb-3">{event.description}</p>

        {/* Event Details */}
        <div className="bg-muted/50 rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{event.eventDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{event.eventTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>

      {/* Attendees Badge */}
      <div className="mb-3">
        <Badge variant="secondary" className="gap-1">
          {attendees} {attendees === 1 ? "person" : "people"} interested
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant={isInterested ? "default" : "outline"}
          size="sm"
          className="flex-1"
          onClick={handleInterested}
        >
          <Heart className={`w-4 h-4 mr-2 ${isInterested ? "fill-current" : ""}`} />
          {isInterested ? "Interested" : "I'm Interested"}
        </Button>
        <Button variant="ghost" size="sm" className="gap-1">
          <MessageCircle className="w-4 h-4" />
          <span>{event.comments}</span>
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function BorrowRequestCard({ request }: { request: BorrowRequest }) {
  return (
    <div className="bg-background border-b p-4">
      {/* User Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={request.userAvatar} />
            <AvatarFallback>{request.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{request.userName}</p>
            <p className="text-sm text-muted-foreground">{request.dormBuilding}</p>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{request.timeAgo}</span>
      </div>

      {/* Request Content */}
      <div className="mb-3">
        <div className="flex items-start gap-2 mb-2">
          <Package className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
          <h3 className="font-semibold">Need to borrow: {request.itemName}</h3>
        </div>
        <p className="text-sm mb-3">{request.description}</p>

        {/* Request Details */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>Needed for: {request.duration}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="default" size="sm" className="flex-1">
          I Can Help
        </Button>
        <Button variant="ghost" size="sm" className="gap-1">
          <MessageCircle className="w-4 h-4" />
          <span>{request.comments}</span>
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function BuyListingCard({ listing }: { listing: BuyListing }) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="bg-background border-b p-4">
      {/* User Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={listing.userAvatar} />
            <AvatarFallback>{listing.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{listing.userName}</p>
            <p className="text-sm text-muted-foreground">{listing.dormBuilding}</p>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{listing.timeAgo}</span>
      </div>

      {/* Item Image */}
      {listing.images.length > 0 && (
        <div className="mb-3 rounded-lg overflow-hidden">
          <ImageWithFallback
            src={listing.images[0]}
            alt={listing.itemName}
            className="relative aspect-[4/3] max-h-64 overflow-hidden bg-muted rounded-lg mx-4"
          />
        </div>
      )}

      {/* Listing Content */}
      <div className="mb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold">{listing.itemName}</h3>
          <div className="flex items-center gap-1 text-green-600 shrink-0">
            <DollarSign className="w-5 h-5" />
            <span className="text-lg">{listing.price}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="gap-1">
            <Tag className="w-3 h-3" />
            {listing.condition}
          </Badge>
          {listing.isSold && (
            <Badge variant="outline" className="border-red-500 text-red-500">
              Sold
            </Badge>
          )}
        </div>

        <p className="text-sm">{listing.description}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1"
          disabled={listing.isSold}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          {listing.isSold ? "Sold" : "Message Seller"}
        </Button>
        <Button 
          variant={isSaved ? "default" : "ghost"} 
          size="sm"
          onClick={() => setIsSaved(!isSaved)}
        >
          <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
        </Button>
        <Button variant="ghost" size="sm" className="gap-1">
          <MessageCircle className="w-4 h-4" />
          <span>{listing.comments}</span>
        </Button>
      </div>
    </div>
  );
}

interface CommunityViewProps {
  onCreatePost: () => void;
}

export function CommunityView({ onCreatePost }: CommunityViewProps) {
  const [filter, setFilter] = useState<"all" | "event" | "borrow" | "buy">("all");

  const filteredPosts = communityPosts.filter((post) => {
    if (filter === "all") return true;
    return post.type === filter;
  });

  return (
    <div>
      {/* Filter Tabs */}
      <div className="sticky top-[57px] z-30 bg-background/95 backdrop-blur border-b px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <Badge
            variant={filter === "all" ? "default" : "outline"}
            className="whitespace-nowrap cursor-pointer"
            onClick={() => setFilter("all")}
          >
            All Posts
          </Badge>
          <Badge
            variant={filter === "event" ? "default" : "outline"}
            className="whitespace-nowrap cursor-pointer"
            onClick={() => setFilter("event")}
          >
            Events
          </Badge>
          <Badge
            variant={filter === "buy" ? "default" : "outline"}
            className="whitespace-nowrap cursor-pointer"
            onClick={() => setFilter("buy")}
          >
            Buy
          </Badge>
          <Badge
            variant={filter === "borrow" ? "default" : "outline"}
            className="whitespace-nowrap cursor-pointer"
            onClick={() => setFilter("borrow")}
          >
            Borrow Requests
          </Badge>
        </div>
      </div>

      {/* Posts */}
      <div>
        {filteredPosts.map((post) => {
          if (post.type === "event") {
            return <EventCard key={post.id} event={post} />;
          } else if (post.type === "buy") {
            return <BuyListingCard key={post.id} listing={post} />;
          } else {
            return <BorrowRequestCard key={post.id} request={post} />;
          }
        })}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={onCreatePost}
        className="fixed right-4 bottom-24 z-50 w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
