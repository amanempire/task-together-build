
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
import { X, Plus, Trash2, ArrowDown, ArrowUp, ListTodo } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SubtaskProps } from "@/components/TaskCard";

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
  const [subtasks, setSubtasks] = useState<SubtaskProps[]>([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSkill = (skill: string) => {
    if (!skills.includes(skill) && skill) {
      setSkills([...skills, skill]);
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) {
      toast.error("Subtask title cannot be empty");
      return;
    }

    const newSubtask: SubtaskProps = {
      id: `new-${Date.now()}`,
      title: newSubtaskTitle,
      completed: false,
    };

    setSubtasks([...subtasks, newSubtask]);
    setNewSubtaskTitle("");
  };

  const handleAddNestedSubtask = (parentId: string) => {
    // Find the subtask input field by parent ID
    const inputElement = document.getElementById(`nested-subtask-${parentId}`) as HTMLInputElement;
    if (!inputElement || !inputElement.value.trim()) {
      toast.error("Nested subtask title cannot be empty");
      return;
    }

    // Function to add nested subtask to a parent
    const addNestedSubtask = (items: SubtaskProps[], parentId: string, newSubtask: SubtaskProps): SubtaskProps[] => {
      return items.map(item => {
        if (item.id === parentId) {
          // Add to this item's subtasks
          const updatedSubtasks = item.subtasks ? [...item.subtasks, newSubtask] : [newSubtask];
          return { ...item, subtasks: updatedSubtasks };
        } else if (item.subtasks) {
          // Check this item's subtasks recursively
          return {
            ...item,
            subtasks: addNestedSubtask(item.subtasks, parentId, newSubtask)
          };
        }
        return item;
      });
    };

    const newNestedSubtask: SubtaskProps = {
      id: `new-${Date.now()}`,
      title: inputElement.value,
      completed: false,
    };

    setSubtasks(prev => addNestedSubtask(prev, parentId, newNestedSubtask));
    inputElement.value = "";
  };

  const handleRemoveSubtask = (subtaskId: string) => {
    // Function to remove a subtask from the tree
    const removeSubtaskById = (items: SubtaskProps[], id: string): SubtaskProps[] => {
      // Filter out the subtask with matching id at this level
      const filteredItems = items.filter(item => item.id !== id);
      
      // Recursively check remaining subtasks
      return filteredItems.map(item => {
        if (item.subtasks) {
          return {
            ...item,
            subtasks: removeSubtaskById(item.subtasks, id)
          };
        }
        return item;
      });
    };

    setSubtasks(prev => removeSubtaskById(prev, subtaskId));
  };

  const moveSubtask = (subtaskId: string, direction: 'up' | 'down') => {
    // Function to find and move a subtask within its parent array
    const moveSubtaskInArray = (items: SubtaskProps[], id: string, direction: 'up' | 'down'): SubtaskProps[] => {
      // Find the index of the subtask in this level
      const index = items.findIndex(item => item.id === id);
      
      // If not found at this level, recursively check subtasks
      if (index === -1) {
        return items.map(item => {
          if (item.subtasks) {
            return {
              ...item,
              subtasks: moveSubtaskInArray(item.subtasks, id, direction)
            };
          }
          return item;
        });
      }
      
      // Found at this level, perform the move
      const newItems = [...items];
      if (direction === 'up' && index > 0) {
        // Swap with previous item
        [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
      } else if (direction === 'down' && index < items.length - 1) {
        // Swap with next item
        [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      }
      
      return newItems;
    };

    setSubtasks(prev => moveSubtaskInArray(prev, subtaskId, direction));
  };

  const renderSubtasks = (items: SubtaskProps[], level = 0) => {
    return items.map((subtask, index) => (
      <div 
        key={subtask.id} 
        className={`pl-${level * 4} py-2 border-l-2 ${level > 0 ? 'ml-6' : ''} border-gray-200 mt-2`}
      >
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2">
            <ListTodo className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">{subtask.title}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={(e) => {
                e.preventDefault();
                moveSubtask(subtask.id, 'up');
              }}
              disabled={index === 0}
            >
              <ArrowUp className="h-4 w-4" />
              <span className="sr-only">Move up</span>
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={(e) => {
                e.preventDefault();
                moveSubtask(subtask.id, 'down');
              }}
              disabled={index === items.length - 1}
            >
              <ArrowDown className="h-4 w-4" />
              <span className="sr-only">Move down</span>
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-red-500" 
              onClick={(e) => {
                e.preventDefault();
                handleRemoveSubtask(subtask.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        </div>
        
        {/* Render existing nested subtasks */}
        {subtask.subtasks && subtask.subtasks.length > 0 && (
          <div className="mt-2">
            {renderSubtasks(subtask.subtasks, level + 1)}
          </div>
        )}
        
        {/* Add nested subtask input */}
        <div className="mt-2 ml-6 flex items-center gap-2">
          <Input
            id={`nested-subtask-${subtask.id}`}
            placeholder="Add a nested subtask..."
            className="h-8 text-sm"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8"
            onClick={(e) => {
              e.preventDefault();
              handleAddNestedSubtask(subtask.id);
            }}
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add
          </Button>
        </div>
      </div>
    ));
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

                {/* Subtasks Section */}
                <div className="space-y-2">
                  <Label>Subtasks</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Add a subtask..."
                      value={newSubtaskTitle}
                      onChange={(e) => setNewSubtaskTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSubtask();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={handleAddSubtask}
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                  
                  {subtasks.length > 0 ? (
                    <div className="mt-4 border rounded-md p-3 bg-gray-50">
                      {renderSubtasks(subtasks)}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No subtasks added yet
                    </p>
                  )}
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
