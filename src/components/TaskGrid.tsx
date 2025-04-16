
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TaskCard, { TaskCardProps } from "@/components/TaskCard";

interface TaskGridProps {
  tasks: TaskCardProps[];
  emptyStateAction?: React.ReactNode;
}

const TaskGrid = ({ tasks, emptyStateAction }: TaskGridProps) => {
  return (
    <>
      {tasks.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </div>
      ) : (
        <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed">
          <p className="text-lg text-muted-foreground">No tasks found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
          {emptyStateAction}
        </div>
      )}
    </>
  );
};

export default TaskGrid;
