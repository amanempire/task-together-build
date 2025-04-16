
import { TaskCardProps } from "@/components/TaskCard";
import TaskFilters from "@/components/TaskFilters";
import TaskGrid from "@/components/TaskGrid";

interface ContributeTasksPanelProps {
  tasks: TaskCardProps[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSkill: string;
  setSelectedSkill: (skill: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedReward: string;
  setSelectedReward: (reward: string) => void;
  clearFilters: () => void;
}

const ContributeTasksPanel = ({
  tasks,
  searchQuery,
  setSearchQuery,
  selectedSkill,
  setSelectedSkill,
  selectedStatus,
  setSelectedStatus,
  selectedReward,
  setSelectedReward,
  clearFilters,
}: ContributeTasksPanelProps) => {
  return (
    <div className="space-y-6">
      <TaskFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSkill={selectedSkill}
        setSelectedSkill={setSelectedSkill}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedReward={selectedReward}
        setSelectedReward={setSelectedReward}
        clearFilters={clearFilters}
        showRewardFilter={true}
      />
      <TaskGrid tasks={tasks} />
    </div>
  );
};

export default ContributeTasksPanel;
