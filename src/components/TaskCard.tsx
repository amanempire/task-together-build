
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  skills: string[];
  deadline: string;
  reward: string;
  postedBy?: {
    name: string;
    avatar: string;
  };
  contributors?: {
    name: string;
    avatar: string;
  }[];
  status?: "open" | "in-progress" | "completed";
  isMyTask?: boolean;
}

const TaskCard = ({
  id,
  title,
  description,
  skills,
  deadline,
  reward,
  postedBy,
  contributors,
  status = "open",
  isMyTask = false,
}: TaskCardProps) => {
  // Calculate days remaining
  const deadlineDate = new Date(deadline);
  const currentDate = new Date();
  const timeDiff = deadlineDate.getTime() - currentDate.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <Link to={`/task/${id}`}>
      <div className="rounded-xl border bg-card p-5 shadow-sm card-hover">
        <div className="flex flex-col space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold">{title}</h3>
              {postedBy && !isMyTask && (
                <div className="mt-1 flex items-center text-sm text-muted-foreground">
                  <span>Posted by </span>
                  <Avatar className="ml-1 mr-1 h-5 w-5">
                    <AvatarImage src={postedBy.avatar} alt={postedBy.name} />
                    <AvatarFallback>
                      {postedBy.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{postedBy.name}</span>
                </div>
              )}
            </div>
            <Badge
              className={`${
                status === "open"
                  ? "bg-green-100 text-green-800"
                  : status === "in-progress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {status === "open"
                ? "Open"
                : status === "in-progress"
                ? "In Progress"
                : "Completed"}
            </Badge>
          </div>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-accent">
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="outline" className="bg-accent">
                +{skills.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between pt-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>{daysRemaining} days left</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                <span>{new Date(deadline).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="font-semibold text-brand-purple">{reward}</div>
          </div>

          {isMyTask && contributors && contributors.length > 0 && (
            <div className="flex items-center pt-2">
              <span className="mr-2 text-sm text-muted-foreground">Contributors:</span>
              <div className="flex -space-x-2">
                {contributors.slice(0, 3).map((contributor, index) => (
                  <Avatar key={index} className="h-6 w-6 border-2 border-background">
                    <AvatarImage src={contributor.avatar} alt={contributor.name} />
                    <AvatarFallback>
                      {contributor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {contributors.length > 3 && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                    +{contributors.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="pt-2">
            {isMyTask ? (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  // Logic to manage task
                }}
              >
                Manage Task
              </Button>
            ) : (
              <Button
                className="w-full btn-hover"
                onClick={(e) => {
                  e.preventDefault();
                  // Logic to apply for task
                }}
              >
                Apply Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
