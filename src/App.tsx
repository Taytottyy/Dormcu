import { DormCard } from "./components/DormCard";
import { BottomNav } from "./components/BottomNav";
import { SearchView } from "./components/SearchView";
import { UploadDormDialog } from "./components/UploadDormDialog";
import { ProfilePhotoUpload } from "./components/ProfilePhotoUpload";
import { CommunityView } from "./components/CommunityView";
import { CreateCommunityPostDialog } from "./components/CreateCommunityPostDialog";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { TrendingUp, Bookmark, User, Plus, Settings } from "lucide-react";
import { useState } from "react";
import logoImage from "figma:asset/9f80c738344dbe6a3cf4fe17d3893b12afaf5d96.png";
import additionalImage from "figma:asset/e7417e4c8aacc6c0950265b4b7f7bd25200c42c7.png";

// Mock data for dorm rooms
const dormRooms = [
  {
    id: "1",
    userName: "Sarah Chen",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    dormBuilding: "Wien Hall",
    roomNumber: "717",
    images: [
      "https://www.housing.columbia.edu/sites/www.housing.columbia.edu/files/styles/cu_crop/public/content/img/Buildings/Wien/Wien424.jpg?itok=X3RVe_6I",
      additionalImage,
    ],
    description: "Finally got my room exactly how I wanted it! The tapestry and string lights make it so cozy for late-night study sessions 📚✨",
    likes: 124,
    comments: 18,
    tags: ["cozy", "bohemian", "string-lights"],
    timeAgo: "2h ago",
  },
  {
    id: "2",
    userName: "Marcus Johnson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    dormBuilding: "East Campus",
    roomNumber: "812",
    imageUrl: "https://www.liberty.edu/residence-life/wp-content/uploads/sites/97/2019/10/East-Living-Area-20181219_41209LR.jpg",
    description: "Minimalist setup = maximum productivity. Everything has its place and I love the clean aesthetic 🖤",
    likes: 201,
    comments: 32,
    tags: ["minimalist", "modern", "organized"],
    timeAgo: "5h ago",
  },
  {
    id: "3",
    userName: "Emma Rodriguez",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    dormBuilding: "Carman Hall",
    roomNumber: "1007",
    imageUrl: "https://theshaft.s3.amazonaws.com/dorms/regulars/carman/Carman+Hall/Annie_Son_The+Shaft_+Carman_30Nov21_CDS+-11.jpg",
    description: "My little sanctuary! Added tons of plants and warm lighting to make it feel like home 🌿",
    likes: 167,
    comments: 24,
    tags: ["plants", "cozy", "warm-tones"],
    timeAgo: "1d ago",
  },
  {
    id: "4",
    userName: "Alex Kim",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    dormBuilding: "Wallach Hall",
    roomNumber: "412",
    imageUrl: "https://conferencehousing.columbia.edu/sites/conferencehousing.columbia.edu/files/styles/cu_crop/public/content/Wallach/Wallach610.jpg?itok=-j-kX4l6",
    description: "Went for a Scandinavian vibe this semester. Clean, simple, and peaceful 🤍",
    likes: 189,
    comments: 21,
    tags: ["scandinavian", "minimalist", "neutral"],
    timeAgo: "1d ago",
  },
  {
    id: "5",
    userName: "Jordan Taylor",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    dormBuilding: "John Jay Hall",
    roomNumber: "506",
    imageUrl: "https://www.housing.columbia.edu/sites/www.housing.columbia.edu/files/styles/cu_crop/public/content/img/Buildings/John%20Jay/JohnJay1043.jpg?itok=laWz4D7-",
    description: "Life's too short for boring rooms! Went all out with color and it brings me so much joy every day 🌈💙",
    likes: 243,
    comments: 41,
    tags: ["colorful", "eclectic", "bold"],
    timeAgo: "2d ago",
  },
  {
    id: "6",
    userName: "Olivia Martinez",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    dormBuilding: "Furnald Hall",
    roomNumber: "417",
    imageUrl: "https://images.unsplash.com/photo-1698422454454-a4e2a661aba8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwZGVzayUyMHNldHVwfGVufDF8fHx8MTc2MjY1ODUyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "My study corner is my happy place! Invested in good lighting and organization - game changer for productivity 💻",
    likes: 156,
    comments: 27,
    tags: ["study-space", "organized", "productive"],
    timeAgo: "3d ago",
  },
  {
    id: "7",
    userName: "Liam Chen",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
    dormBuilding: "Hartley Hall",
    roomNumber: "305",
    imageUrl: "https://images.unsplash.com/photo-1622930417422-9a0a69d13e17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwZG9ybSUyMHRhcGVzdHJ5fGVufDF8fHx8MTc2MjY1ODUyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Classic Hartley charm! Love the high ceilings and the historic feel of this building 🏛️",
    likes: 178,
    comments: 19,
    tags: ["classic", "spacious", "historic"],
    timeAgo: "4d ago",
  },
  {
    id: "8",
    userName: "Sophia Patel",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    dormBuilding: "McBain Hall",
    roomNumber: "1204",
    imageUrl: "https://images.unsplash.com/photo-1548867450-f4f6f720378a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZG9ybSUyMHJvb218ZW58MXx8fHwxNzYyNjU4NTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Suite life is the best life! Having a common room makes all the difference 🛋️",
    likes: 213,
    comments: 35,
    tags: ["suite", "modern", "social"],
    timeAgo: "5d ago",
  },
  {
    id: "9",
    userName: "Noah Williams",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
    dormBuilding: "Broadway Hall",
    roomNumber: "628",
    imageUrl: "https://www.ramsa.com/sites/default/files/96020-ESTO-2000A90.121-2.jpg",
    description: "Broadway views and plenty of natural light! This room exceeded my expectations 🌇",
    likes: 192,
    comments: 28,
    tags: ["view", "bright", "modern"],
    timeAgo: "6d ago",
  },
  {
    id: "10",
    userName: "Ava Thompson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava",
    dormBuilding: "Schapiro Hall",
    roomNumber: "914",
    imageUrl: "https://images.unsplash.com/photo-1677658288024-b6b9ed29354e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW1wbGUlMjBzdHVkZW50JTIwYmVkcm9vbXxlbnwxfHx8fDE3NjI2NTg1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Schapiro suite vibes! Perfect for making friends and late-night hangouts 🎉",
    likes: 225,
    comments: 42,
    tags: ["suite-style", "social", "cozy"],
    timeAgo: "1w ago",
  },
  {
    id: "11",
    userName: "Ethan Brooks",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
    dormBuilding: "River Hall",
    roomNumber: "521",
    imageUrl: "https://images.unsplash.com/photo-1677793840758-fec4c5e0dfd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGRvcm0lMjBkZWNvcnxlbnwxfHx8fDE3NjI2NTg1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "River views are unbeatable! Waking up to this every day is a dream 🌊",
    likes: 198,
    comments: 31,
    tags: ["river-view", "spacious", "modern"],
    timeAgo: "1w ago",
  },
  {
    id: "12",
    userName: "Isabella Garcia",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
    dormBuilding: "Ruggles Hall",
    roomNumber: "703",
    imageUrl: "https://images.unsplash.com/photo-1698422454454-a4e2a661aba8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwZGVzayUyMHNldHVwfGVufDF8fHx8MTc2MjY1ODUyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Cozy corner in Ruggles! Small but mighty - made the most of the space 💪",
    likes: 141,
    comments: 22,
    tags: ["compact", "organized", "efficient"],
    timeAgo: "1w ago",
  },
  {
    id: "13",
    userName: "Mason Lee",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mason",
    dormBuilding: "Carlton Arms",
    roomNumber: "308",
    imageUrl: "https://images.unsplash.com/photo-1622930417422-9a0a69d13e17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwZG9ybSUyMHRhcGVzdHJ5fGVufDF8fHx8MTc2MjY1ODUyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Carlton Arms has the best community! Love living here with amazing people 🏠",
    likes: 176,
    comments: 29,
    tags: ["community", "friendly", "welcoming"],
    timeAgo: "2w ago",
  },
  {
    id: "14",
    userName: "Mia Anderson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
    dormBuilding: "Hogan Hall",
    roomNumber: "615",
    imageUrl: "https://images.unsplash.com/photo-1761502583547-0de6676a06a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3JtJTIwcm9vbSUyMHBsYW50c3xlbnwxfHx8fDE3NjI2NTg1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Hogan Hall perks: amazing amenities and super convenient location 📍",
    likes: 204,
    comments: 37,
    tags: ["convenient", "amenities", "modern"],
    timeAgo: "2w ago",
  },
  {
    id: "15",
    userName: "Harper Davis",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harper",
    dormBuilding: "Sulzberger Hall",
    roomNumber: "421",
    imageUrl: "https://images.unsplash.com/photo-1548867450-f4f6f720378a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZG9ybSUyMHJvb218ZW58MXx8fHwxNzYyNjU4NTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Sulzberger life! Love the Barnard community and the proximity to everything 💙",
    likes: 187,
    comments: 26,
    tags: ["barnard", "community", "convenient"],
    timeAgo: "2w ago",
  },
  {
    id: "16",
    userName: "Grace Wilson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
    dormBuilding: "Brooks Hall",
    roomNumber: "804",
    imageUrl: "https://images.unsplash.com/photo-1677658288024-b6b9ed29354e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW1wbGUlMjBzdHVkZW50JTIwYmVkcm9vbXxlbnwxfHx8fDE3NjI2NTg1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Brooks Hall has the best views of campus! My cozy corner for studying and relaxing 🌸",
    likes: 165,
    comments: 23,
    tags: ["view", "cozy", "barnard"],
    timeAgo: "3w ago",
  },
  {
    id: "17",
    userName: "Zoe Martinez",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe",
    dormBuilding: "Reid Hall",
    roomNumber: "312",
    imageUrl: "https://images.unsplash.com/photo-1622930417422-9a0a69d13e17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwZG9ybSUyMHRhcGVzdHJ5fGVufDF8fHx8MTc2MjY1ODUyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Reid Hall charm! Small but perfectly formed - decorated it with tapestries and fairy lights ✨",
    likes: 143,
    comments: 18,
    tags: ["cozy", "decorative", "barnard"],
    timeAgo: "3w ago",
  },
  {
    id: "18",
    userName: "Chloe Thompson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe",
    dormBuilding: "Hewitt Hall",
    roomNumber: "526",
    imageUrl: "https://images.unsplash.com/photo-1761502583547-0de6676a06a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3JtJTIwcm9vbSUyMHBsYW50c3xlbnwxfHx8fDE3NjI2NTg1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Hewitt Hall with all the plants! Creating my urban jungle one succulent at a time 🌱",
    likes: 172,
    comments: 25,
    tags: ["plants", "green", "barnard"],
    timeAgo: "3w ago",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("feed");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showCommunityPostDialog, setShowCommunityPostDialog] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=You"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header - Only show on Feed, Trending, Community, Saved, Profile */}
      {activeTab !== "search" && (
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <img src={logoImage} alt="Dorm @ CU" className="h-10 w-auto" />
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="pb-20">
        {/* Feed View */}
        {activeTab === "feed" && (
          <div>
            {/* Filter Pills */}
            <div className="sticky top-[57px] z-30 bg-background/95 backdrop-blur border-b px-4 py-3">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                <Badge variant="default" className="whitespace-nowrap cursor-pointer">
                  All
                </Badge>
                <Badge variant="outline" className="whitespace-nowrap cursor-pointer">
                  John Jay
                </Badge>
                <Badge variant="outline" className="whitespace-nowrap cursor-pointer">
                  Carman
                </Badge>
                <Badge variant="outline" className="whitespace-nowrap cursor-pointer">
                  Wien
                </Badge>
                <Badge variant="outline" className="whitespace-nowrap cursor-pointer">
                  Wallach
                </Badge>
                <Badge variant="outline" className="whitespace-nowrap cursor-pointer">
                  East Campus
                </Badge>
                <Badge variant="outline" className="whitespace-nowrap cursor-pointer">
                  McBain
                </Badge>
                <Badge variant="outline" className="whitespace-nowrap cursor-pointer">
                  Sulzberger
                </Badge>
                <Badge variant="outline" className="whitespace-nowrap cursor-pointer">
                  Brooks
                </Badge>
                <Badge variant="outline" className="whitespace-nowrap cursor-pointer">
                  Reid
                </Badge>
                <Badge variant="outline" className="whitespace-nowrap cursor-pointer">
                  Hewitt
                </Badge>
              </div>
            </div>

            {/* Dorm Cards */}
            <div>
              {dormRooms.map((room) => (
                <DormCard key={room.id} {...room} />
              ))}
            </div>
          </div>
        )}

        {/* Trending View */}
        {activeTab === "trending" && (
          <div>
            {/* Sort Options */}
            <div className="px-4 py-4 border-b">
              <Select defaultValue="week">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Trending Cards */}
            <div>
              {dormRooms
                .sort((a, b) => b.likes - a.likes)
                .map((room) => (
                  <DormCard key={room.id} {...room} />
                ))}
            </div>
          </div>
        )}

        {/* Search View */}
        {activeTab === "search" && <SearchView />}

        {/* Community View */}
        {activeTab === "community" && (
          <CommunityView onCreatePost={() => setShowCommunityPostDialog(true)} />
        )}

        {/* Saved View */}
        {activeTab === "saved" && (
          <div className="text-center py-20 px-4">
            <Bookmark className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="mb-2">No Saved Rooms Yet</h3>
            <p className="text-muted-foreground mb-6">
              Bookmark your favorite dorm designs to view them later
            </p>
            <Button onClick={() => setActiveTab("feed")}>Explore Rooms</Button>
          </div>
        )}

        {/* Profile View */}
        {activeTab === "profile" && (
          <div>
            {/* Profile Header */}
            <div className="px-4 py-6 border-b">
              <div className="flex items-start gap-4 mb-4">
                <ProfilePhotoUpload
                  currentPhoto={profilePhoto}
                  userName="Your Name"
                  onPhotoChange={setProfilePhoto}
                />
                <div className="flex-1">
                  <h2>Your Name</h2>
                  <p className="text-sm text-muted-foreground">Morrison Hall • Room 304B</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="mb-1">0</div>
                  <div className="text-xs text-muted-foreground">Posts</div>
                </div>
                <div className="text-center">
                  <div className="mb-1">0</div>
                  <div className="text-xs text-muted-foreground">Likes</div>
                </div>
                <div className="text-center">
                  <div className="mb-1">0</div>
                  <div className="text-xs text-muted-foreground">Saved</div>
                </div>
              </div>

              <Button className="w-full">Edit Profile</Button>
            </div>

            {/* Empty State */}
            <div className="text-center py-12 px-4">
              <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="mb-2">Share Your First Room</h3>
              <p className="text-muted-foreground mb-6">
                Upload photos of your dorm to inspire others
              </p>
              <Button onClick={() => setShowUploadDialog(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Upload Room
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Floating Action Button - Only on Feed and Trending */}
      {(activeTab === "feed" || activeTab === "trending") && (
        <button
          onClick={() => setShowUploadDialog(true)}
          className="fixed right-4 bottom-24 z-50 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        >
          <Plus className="w-6 h-6 text-primary-foreground" />
        </button>
      )}

      {/* Upload Dialog */}
      {showUploadDialog && (
        <div className="fixed inset-0 z-50">
          <UploadDormDialog />
        </div>
      )}

      {/* Create Community Post Dialog */}
      {showCommunityPostDialog && (
        <CreateCommunityPostDialog
          onClose={() => setShowCommunityPostDialog(false)}
        />
      )}
    </div>
  );
}