
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FilePenLine,
  MessageSquare,
  User,
  UserCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample task data
const taskData = {
  id: "1",
  title: "Build a responsive landing page",
  description:
    "I need a skilled frontend developer to create a responsive landing page for my new startup. The landing page should be modern, fast, and optimized for mobile devices.\n\nThe page should include:\n- Hero section with a call to action\n- Features section\n- Testimonials\n- Pricing section\n- Contact form\n\nPreferred technologies: React, Tailwind CSS, and Next.js. The design mockups are already prepared in Figma and will be shared with the selected contributor.\n\nPlease apply only if you have experience with these technologies and can complete the project within the given deadline.",
  skills: ["Web Development", "HTML", "CSS", "React", "Tailwind CSS"],
  deadline: "2025-05-20",
  reward: "$200",
  postedBy: {
    id: "user1",
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    tasksPosted: 12,
    tasksContributed: 5,
  },
  status: "open",
  applicants: [
    {
      id: "applicant1",
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      message: "I have extensive experience with React and Tailwind CSS. I've built several responsive landing pages for startups in the past. Would love to help with your project!",
      date: "2025-04-12",
    },
    {
      id: "applicant2",
      name: "Sarah Kim",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      message: "Frontend developer with 5+ years of experience. I specialize in creating beautiful, responsive websites with React and Tailwind CSS. Very interested in your project.",
      date: "2025-04-13",
    },
  ],
  createdAt: "2025-04-10",
};

// Sample my task data (when the user is the owner)
const myTaskData = {
  ...taskData,
  isMyTask: true,
};

const TaskDetail = () => {
  const { taskId } = useParams();
  const [applicationMessage, setApplicationMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // In a real application, you would fetch the task data based on taskId
  // For this demo, we'll just determine if it's the user's task or not
  const isMyTask = taskId === "5" || taskId === "6";
  const task = isMyTask ? myTaskData : taskData;
  
  // Calculate days remaining
  const deadlineDate = new Date(task.deadline);
  const currentDate = new Date();
  const timeDiff = deadlineDate.getTime() - currentDate.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const handleApply = () => {
    if (!applicationMessage.trim()) {
      toast.error("Please write a message to the task creator");
      return;
    }
    
    setIsSubmitting(true);

    // Simulate submitting application
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Application submitted successfully!");
      setApplicationMessage("");
    }, 1500);
  };

  const handleAcceptApplicant = (applicantId: string) => {
    // Simulate accepting applicant
    toast.success("Applicant accepted successfully!");
  };

  const handleMessageApplicant = (applicantId: string) => {
    // Simulate messaging applicant
    toast.success("Message feature coming soon!");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isLoggedIn={true} />
      
      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          <Link
            to="/home"
            className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="animate-scale-in">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold">{task.title}</CardTitle>
                      <CardDescription className="mt-2">
                        Posted on {new Date(task.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge
                      className={`${
                        task.status === "open"
                          ? "bg-green-100 text-green-800"
                          : task.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {task.status === "open"
                        ? "Open"
                        : task.status === "in-progress"
                        ? "In Progress"
                        : "Completed"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Description</h3>
                    <div className="whitespace-pre-line text-muted-foreground">
                      {task.description}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {task.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-accent">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold">Deadline</h3>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{new Date(task.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{daysRemaining} days remaining</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">Reward</h3>
                      <p className="text-xl font-semibold text-brand-purple">
                        {task.reward}
                      </p>
                    </div>
                  </div>

                  {!isMyTask && (
                    <div className="space-y-4 rounded-lg border bg-accent p-4">
                      <h3 className="font-semibold">Apply for this task</h3>
                      <Textarea
                        placeholder="Write a message to the task creator describing why you're a good fit for this task..."
                        rows={4}
                        value={applicationMessage}
                        onChange={(e) => setApplicationMessage(e.target.value)}
                      />
                      <Button 
                        className="w-full" 
                        onClick={handleApply}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Button>
                    </div>
                  )}

                  {isMyTask && task.applicants && task.applicants.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Applicants ({task.applicants.length})</h3>
                      <div className="space-y-4">
                        {task.applicants.map((applicant) => (
                          <div
                            key={applicant.id}
                            className="rounded-lg border p-4"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={applicant.avatar} alt={applicant.name} />
                                  <AvatarFallback>
                                    {applicant.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-semibold">{applicant.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Applied on {new Date(applicant.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                              {applicant.message}
                            </p>
                            <div className="mt-4 flex gap-2">
                              <Button
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => handleAcceptApplicant(applicant.id)}
                              >
                                <UserCheck className="h-4 w-4" />
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center gap-1"
                                onClick={() => handleMessageApplicant(applicant.id)}
                              >
                                <MessageSquare className="h-4 w-4" />
                                Message
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle>Posted by</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={task.postedBy.avatar} alt={task.postedBy.name} />
                      <AvatarFallback>
                        {task.postedBy.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{task.postedBy.name}</h3>
                      <div className="flex items-center">
                        <span className="text-sm text-yellow-500">★</span>
                        <span className="ml-1 text-sm">{task.postedBy.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 rounded-lg border p-3">
                    <div className="space-y-1 text-center">
                      <p className="text-sm text-muted-foreground">Tasks Posted</p>
                      <p className="text-lg font-semibold">{task.postedBy.tasksPosted}</p>
                    </div>
                    <div className="space-y-1 text-center">
                      <p className="text-sm text-muted-foreground">Contributed</p>
                      <p className="text-lg font-semibold">{task.postedBy.tasksContributed}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => toast.info("Profile view coming soon!")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      View Profile
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => toast.info("Messaging feature coming soon!")}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TaskDetail;
