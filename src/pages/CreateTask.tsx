
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const allSkills = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Graphic Design",
  "Content Writing",
  "Marketing",
  "Video Editing",
  "SEO",
  "Data Analysis",
  "Project Management",
  "Social Media",
  "Translation",
];

const CreateTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [deadline, setDeadline] = useState("");
  const [reward, setReward] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSkill = (skill: string) => {
    if (!skills.includes(skill) && skill) {
      setSkills([...skills, skill]);
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title) {
      toast.error("Title is required");
      return;
    }
    
    if (!description) {
      toast.error("Description is required");
      return;
    }
    
    if (skills.length === 0) {
      toast.error("At least one skill is required");
      return;
    }
    
    if (!deadline) {
      toast.error("Deadline is required");
      return;
    }
    
    if (!reward) {
      toast.error("Reward is required");
      return;
    }
    
    setIsLoading(true);

    // Simulate task creation
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Task created successfully!");
      navigate("/home");
    }, 1500);
  };

  // Calculate min date (today) for the deadline input
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isLoggedIn={true} />
      
      <main className="flex-1 py-12">
        <div className="container max-w-2xl">
          <Card className="animate-scale-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Create a New Task</CardTitle>
              <CardDescription>
                Post a task that you need help with. Be clear and detailed to attract the right contributors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title *</Label>
                  <Input
                    id="title"
                    placeholder="A clear, concise title for your task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about what needs to be done"
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Required Skills *</Label>
                  <Select onValueChange={handleAddSkill}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select skills needed" />
                    </SelectTrigger>
                    <SelectContent>
                      {allSkills
                        .filter((skill) => !skills.includes(skill))
                        .map((skill) => (
                          <SelectItem key={skill} value={skill}>
                            {skill}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="rounded-full p-0.5 hover:bg-accent"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {skill}</span>
                        </button>
                      </Badge>
                    ))}
                    {skills.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No skills selected
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline *</Label>
                    <Input
                      id="deadline"
                      type="date"
                      min={minDate}
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reward">Reward *</Label>
                    <Input
                      id="reward"
                      placeholder="e.g. $100, $150-200, etc."
                      value={reward}
                      onChange={(e) => setReward(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Post Task"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateTask;
