
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";

interface TaskFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSkill: string;
  setSelectedSkill: (skill: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedReward: string;
  setSelectedReward: (reward: string) => void;
  clearFilters: () => void;
  showRewardFilter?: boolean;
}

const TaskFilters = ({
  searchQuery,
  setSearchQuery,
  selectedSkill,
  setSelectedSkill,
  selectedStatus,
  setSelectedStatus,
  selectedReward,
  setSelectedReward,
  clearFilters,
  showRewardFilter = true,
}: TaskFiltersProps) => {
  return (
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
        {showRewardFilter && (
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
        )}

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

        {showRewardFilter && (
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
        )}

        {(selectedSkill || selectedStatus || selectedReward) && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default TaskFilters;
