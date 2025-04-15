
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pencil,
  Calendar,
  Briefcase,
  GraduationCap,
  Check,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";
import TaskCard, { TaskCardProps } from "@/components/TaskCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample user data
const userData = {
  name: "Jamie Wilson",
  avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  bio: "Frontend developer passionate about creating beautiful and functional web experiences. Enjoys collaborating on challenging projects and learning new technologies.",
  skills: ["Web Development", "React", "UI/UX Design", "Tailwind CSS", "JavaScript"],
  university: "Stanford University",
  workplace: "Freelance Developer",
  tasksPosted: 3,
  tasksContributed: 8,
  joinedDate: "January 2025",
};

// Sample tasks data
const contributedTasks: TaskCardProps[] = [
  {
    id: "1",
    title: "Build a responsive landing page",
    description: "Created a modern, responsive landing page using React and Tailwind CSS for a startup.",
    skills: ["Web Development", "HTML", "CSS", "React"],
    deadline: "2025-03-20",
    reward: "$200",
    postedBy: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    status: "completed",
  },
  {
    id: "4",
    title: "Mobile app UI design",
    description: "Designed the UI for a fitness tracking mobile app, creating modern and clean interfaces.",
    skills: ["UI/UX Design", "Mobile Design", "Figma"],
    deadline: "2025-04-15",
    reward: "$300",
    postedBy: {
      name: "Emma Chang",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    status: "completed",
  },
];

const postedTasks: TaskCardProps[] = [
  {
    id: "5",
    title: "Social media strategy",
    description: "Needed help creating a comprehensive social media strategy for my small business, focusing on Instagram and TikTok growth.",
    skills: ["Social Media", "Marketing", "Content Creation"],
    deadline: "2025-05-18",
    reward: "$250",
    status: "open",
    isMyTask: true,
  },
  {
    id: "6",
    title: "Video editing for YouTube",
    description: "Needed someone to edit my tech review videos, adding intro/outro, transitions, and basic effects.",
    skills: ["Video Editing", "Adobe Premiere", "After Effects"],
    deadline: "2025-04-12",
    reward: "$150 per video",
    status: "in-progress",
    isMyTask: true,
    contributors: [
      {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      },
    ],
  },
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...userData });
  const [newAvatar, setNewAvatar] = useState<string | null>(null);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      toast.success("Profile updated successfully!");
    }
    setIsEditing(!isEditing);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate upload and generate a URL
      const reader = new FileReader();
      reader.onload = () => {
        setNewAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({ ...userData });
    setNewAvatar(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isLoggedIn={true} />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Profile sidebar */}
            <div>
              <Card className="animate-scale-in">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src={newAvatar || userData.avatar}
                          alt={userData.name}
                        />
                        <AvatarFallback>
                          {userData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Label
                          htmlFor="avatar-upload"
                          className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-brand-purple text-white hover:bg-brand-purple-dark"
                        >
                          <Upload className="h-4 w-4" />
                          <span className="sr-only">Upload new photo</span>
                          <Input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                          />
                        </Label>
                      )}
                    </div>
                    {isEditing ? (
                      <div className="mt-4 w-full">
                        <Label htmlFor="name" className="sr-only">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={editedUser.name}
                          onChange={(e) =>
                            setEditedUser({ ...editedUser, name: e.target.value })
                          }
                          className="text-center"
                        />
                      </div>
                    ) : (
                      <h2 className="mt-4 text-xl font-bold">{userData.name}</h2>
                    )}

                    <div className="mt-6 grid w-full grid-cols-2 gap-2 rounded-lg border p-3">
                      <div className="space-y-1 text-center">
                        <p className="text-sm text-muted-foreground">Tasks Posted</p>
                        <p className="text-lg font-semibold">{userData.tasksPosted}</p>
                      </div>
                      <div className="space-y-1 text-center">
                        <p className="text-sm text-muted-foreground">Contributed</p>
                        <p className="text-lg font-semibold">{userData.tasksContributed}</p>
                      </div>
                    </div>

                    <div className="mt-6 w-full space-y-4">
                      {isEditing ? (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              id="bio"
                              value={editedUser.bio}
                              onChange={(e) =>
                                setEditedUser({ ...editedUser, bio: e.target.value })
                              }
                              rows={4}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="university">University</Label>
                            <div className="flex items-center">
                              <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="university"
                                value={editedUser.university}
                                onChange={(e) =>
                                  setEditedUser({
                                    ...editedUser,
                                    university: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="workplace">Workplace</Label>
                            <div className="flex items-center">
                              <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="workplace"
                                value={editedUser.workplace}
                                onChange={(e) =>
                                  setEditedUser({
                                    ...editedUser,
                                    workplace: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-muted-foreground">{userData.bio}</p>

                          <div className="flex items-center space-x-2">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            <span>{userData.university}</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span>{userData.workplace}</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Joined {userData.joinedDate}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="mt-6 flex w-full gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={handleCancel}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                        <Button className="flex-1" onClick={handleEditToggle}>
                          <Check className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="mt-6 w-full"
                        onClick={handleEditToggle}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6 animate-scale-in">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-semibold">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {isEditing ? (
                      // Editable skills would go here in a real app
                      userData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                          <button className="ml-1 rounded-full p-0.5 hover:bg-accent">
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {skill}</span>
                          </button>
                        </Badge>
                      ))
                    ) : (
                      userData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tasks tabs */}
            <div className="md:col-span-2">
              <Tabs defaultValue="contributed" className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-2">
                  <TabsTrigger value="contributed">Tasks Contributed To</TabsTrigger>
                  <TabsTrigger value="posted">Tasks Posted</TabsTrigger>
                </TabsList>

                <TabsContent value="contributed" className="space-y-6">
                  {contributedTasks.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2">
                      {contributedTasks.map((task) => (
                        <TaskCard key={task.id} {...task} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed">
                      <p className="text-lg text-muted-foreground">
                        No contributions yet
                      </p>
                      <Link to="/home">
                        <Button className="mt-4">Find Tasks to Contribute</Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="posted" className="space-y-6">
                  {postedTasks.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2">
                      {postedTasks.map((task) => (
                        <TaskCard key={task.id} {...task} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed">
                      <p className="text-lg text-muted-foreground">
                        No tasks posted yet
                      </p>
                      <Link to="/create-task">
                        <Button className="mt-4">Create Your First Task</Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
