
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { PlusCircle, Upload } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const skills = [
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

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [university, setUniversity] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [bio, setBio] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSkillSelect = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      if (selectedSkills.length < 5) {
        setSelectedSkills([...selectedSkills, skill]);
      } else {
        toast.error("You can only select up to 5 skills");
      }
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate upload and generate a URL
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName) {
      toast.error("Full name is required");
      return;
    }
    
    if (selectedSkills.length === 0) {
      toast.error("Please select at least one skill");
      return;
    }
    
    setIsLoading(true);

    // Simulate profile setup
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Profile setup completed successfully!");
      navigate("/home");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container max-w-2xl">
          <Card className="mx-auto animate-scale-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Set up your profile</CardTitle>
              <CardDescription>
                Help others get to know you by completing your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={avatarUrl} alt="Profile picture" />
                    <AvatarFallback className="text-xl">
                      {fullName
                        ? fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mt-4">
                    <Label
                      htmlFor="avatar-upload"
                      className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload Photo</span>
                      <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                      />
                    </Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name *</Label>
                    <Input
                      id="full-name"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Skills *</Label>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Button
                          key={skill}
                          type="button"
                          variant={
                            selectedSkills.includes(skill) ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => handleSkillSelect(skill)}
                          className={
                            selectedSkills.includes(skill)
                              ? "bg-brand-purple hover:bg-brand-purple-dark"
                              : ""
                          }
                        >
                          {skill}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Select up to 5 skills
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">University/College</Label>
                    <Input
                      id="education"
                      placeholder="Your educational institution"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="workplace">Workplace</Label>
                    <Input
                      id="workplace"
                      placeholder="Company or organization"
                      value={workplace}
                      onChange={(e) => setWorkplace(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Short Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell others a bit about yourself"
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
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
                {isLoading ? "Saving..." : "Complete Profile Setup"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfileSetup;
