import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Plus, Search } from "lucide-react";
import TaskCard, { TaskCardProps } from "@/components/TaskCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample data for tasks
const sampleTasks: TaskCardProps[] = [
  {
    id: "1",
    title: "Build a responsive landing page",
    description: "Need a skilled frontend developer to create a responsive landing page for my startup. Design mockups are ready.",
    skills: ["Web Development", "HTML", "CSS", "React"],
    deadline: "2025-05-20",
    reward: "$200",
    postedBy: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    status: "open",
    subtasks: [
      {
        id: "1-1",
        title: "Create header section",
        completed: true,
        subtasks: [
          {
            id: "1-1-1",
            title: "Design navigation menu",
            completed: true,
          },
          {
            id: "1-1-2",
            title: "Implement responsive logo",
            completed: false,
          }
        ]
      },
      {
        id: "1-2",
        title: "Build hero section with CTA",
        completed: false,
      },
      {
        id: "1-3",
        title: "Create testimonials carousel",
        completed: false,
      }
    ]
  },
  {
    id: "2",
    title: "Logo design for tech company",
    description: "Looking for a creative designer to craft a modern, clean logo for a B2B SaaS company. Must represent innovation and trust.",
    skills: ["Graphic Design", "Logo Design", "Branding"],
    deadline: "2025-05-10",
    reward: "$150",
    postedBy: {
      name: "Sarah Miller",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    status: "open",
    subtasks: [
      {
        id: "2-1",
        title: "Research competitor logos",
        completed: true,
      },
      {
        id: "2-2",
        title: "Create 3 initial concepts",
        completed: false,
      },
      {
        id: "2-3",
        title: "Finalize design with revisions",
        completed: false,
      }
    ]
  },
  {
    id: "3",
    title: "Content writing for blog",
    description: "Need articles written about tech trends. Each article should be 1500-2000 words with proper research and SEO optimization.",
    skills: ["Content Writing", "SEO", "Research"],
    deadline: "2025-05-15",
    reward: "$100 per article",
    postedBy: {
      name: "Mike Roberts",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    status: "open",
  },
  {
    id: "4",
    title: "Mobile app UI design",
    description: "Looking for a UI/UX designer to create modern, clean interfaces for a fitness tracking mobile app. Experience with fitness apps is a plus.",
    skills: ["UI/UX Design", "Mobile Design", "Figma"],
    deadline: "2025-05-25",
    reward: "$300",
    postedBy: {
      name: "Emma Chang",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    status: "open",
  },
];

// Sample data for my tasks
const myTasks: TaskCardProps[] = [
  {
    id: "5",
    title: "Social media strategy",
    description: "Need help creating a comprehensive social media strategy for my small business. Focus on Instagram and TikTok growth.",
    skills: ["Social Media", "Marketing", "Content Creation"],
    deadline: "2025-05-18",
    reward: "$250",
    status: "open",
    isMyTask: true,
    subtasks: [
      {
        id: "5-1",
        title: "Competitive analysis",
        completed: true,
      },
      {
        id: "5-2",
        title: "Content calendar for first month",
        completed: false,
      },
      {
        id: "5-3",
        title: "KPI definition and tracking plan",
        completed: false,
      }
    ]
  },
  {
    id: "6",
    title: "Video editing for YouTube",
    description: "Looking for someone to edit my tech review videos. Need intro/outro, transitions, and basic effects. 10-15 minute videos.",
    skills: ["Video Editing", "Adobe Premiere", "After Effects"],
    deadline: "2025-05-12",
    reward: "$150 per video",
    status: "in-progress",
    isMyTask: true,
    contributors: [
      {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      },
    ],
    subtasks: [
      {
        id: "6-1",
        title: "Edit intro sequence",
        completed: true,
      },
      {
        id: "6-2",
        title: "Cut interview segments",
        completed: true,
      },
      {
        id: "6-3",
        title: "Add music and sound effects",
        completed: false,
      },
      {
        id: "6-4",
        title: "Export final version",
        completed: false,
      }
    ]
  },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedReward, setSelectedReward] = useState<string>("");

  // Filter tasks based on search and filters
  const filteredTasks = sampleTasks.filter((task) => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSkill = 
      !selectedSkill || task.skills.includes(selectedSkill);
    
    const matchesStatus = 
      !selectedStatus || task.status === selectedStatus;
    
    // Simple reward filtering (in a real app, would be more sophisticated)
    const matchesReward = !selectedReward || true;
    
    return matchesSearch && matchesSkill && matchesStatus && matchesReward;
  });

  // Filter my tasks based on search and filters
  const filteredMyTasks = myTasks.filter((task) => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      !selectedStatus || task.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const clearFilters = () => {
    setSelectedSkill("");
    setSelectedStatus("");
    setSelectedReward("");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isLoggedIn={true} />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <Link to="/create-task">
              <Button className="btn-hover">
                <Plus className="mr-2 h-4 w-4" />
                Create Task
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="contribute" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="contribute">Contribute to Tasks</TabsTrigger>
              <TabsTrigger value="posted">My Posted Tasks</TabsTrigger>
            </TabsList>

            <TabsContent value="contribute" className="space-y-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                    <SelectTrigger className="w-[150px]">
                      <span className="flex items-center">
                        <Filter className="mr-2 h-3.5 w-3.5" />
                        <span>{selectedSkill || "Skill"}</span>
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Skills</SelectItem>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                      <SelectItem value="Content Writing">Content Writing</SelectItem>
                      <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                      <SelectItem value="Video Editing">Video Editing</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[150px]">
                      <span className="flex items-center">
                        <Filter className="mr-2 h-3.5 w-3.5" />
                        <span>{selectedStatus || "Status"}</span>
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedReward} onValueChange={setSelectedReward}>
                    <SelectTrigger className="w-[150px]">
                      <span className="flex items-center">
                        <Filter className="mr-2 h-3.5 w-3.5" />
                        <span>{selectedReward || "Reward"}</span>
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Reward</SelectItem>
                      <SelectItem value="low">Up to $100</SelectItem>
                      <SelectItem value="medium">$100 - $250</SelectItem>
                      <SelectItem value="high">$250+</SelectItem>
                    </SelectContent>
                  </Select>

                  {(selectedSkill || selectedStatus || selectedReward) && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>

              {filteredTasks.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredTasks.map((task) => (
                    <TaskCard key={task.id} {...task} />
                  ))}
                </div>
              ) : (
                <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed">
                  <p className="text-lg text-muted-foreground">No tasks found</p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="posted" className="space-y-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search your tasks..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[150px]">
                      <span className="flex items-center">
                        <Filter className="mr-2 h-3.5 w-3.5" />
                        <span>{selectedStatus || "Status"}</span>
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>

                  {selectedStatus && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>

              {filteredMyTasks.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredMyTasks.map((task) => (
                    <TaskCard key={task.id} {...task} />
                  ))}
                </div>
              ) : (
                <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed">
                  <p className="text-lg text-muted-foreground">No tasks found</p>
                  <Link to="/create-task">
                    <Button className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Task
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
