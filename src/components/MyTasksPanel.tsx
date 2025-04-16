
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskCardProps } from "@/components/TaskCard";
import TaskFilters from "@/components/TaskFilters";
import TaskGrid from "@/components/TaskGrid";

interface MyTasksPanelProps {
  tasks: TaskCardProps[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  clearFilters: () => void;
}

const MyTasksPanel = ({
  tasks,
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  clearFilters,
}: MyTasksPanelProps) => {
  const emptyStateAction = (
    <Link to="/create-task">
      <Button className="mt-4">
        <Plus className="mr-2 h-4 w-4" />
        Create Your First Task
      </Button>
    </Link>
  );

  return (
    <div className="space-y-6">
      <TaskFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSkill={""}
        setSelectedSkill={() => {}}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedReward={""}
        setSelectedReward={() => {}}
        clearFilters={clearFilters}
        showRewardFilter={false}
      />
      <TaskGrid tasks={tasks} emptyStateAction={emptyStateAction} />
    </div>
  );
};

export default MyTasksPanel;
