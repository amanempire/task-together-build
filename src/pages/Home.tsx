
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContributeTasksPanel from "@/components/ContributeTasksPanel";
import MyTasksPanel from "@/components/MyTasksPanel";
import { sampleTasks, myTasks } from "@/data/sampleTasks";
import { TaskCardProps } from "@/components/TaskCard";

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

            <TabsContent value="contribute">
              <ContributeTasksPanel
                tasks={filteredTasks}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                selectedReward={selectedReward}
                setSelectedReward={setSelectedReward}
                clearFilters={clearFilters}
              />
            </TabsContent>

            <TabsContent value="posted">
              <MyTasksPanel
                tasks={filteredMyTasks}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                clearFilters={clearFilters}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
