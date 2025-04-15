
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface MessageCardProps {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isActive?: boolean;
  taskRelated?: {
    id: string;
    title: string;
  };
}

const MessageCard = ({
  id,
  user,
  lastMessage,
  timestamp,
  unreadCount = 0,
  isActive = false,
  taskRelated,
}: MessageCardProps) => {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 transition-colors",
        isActive
          ? "bg-accent"
          : "hover:bg-accent"
      )}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>
          {user.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{user.name}</h4>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        
        <div className="mt-1 flex items-center justify-between">
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {lastMessage}
          </p>
          {unreadCount > 0 && (
            <Badge className="ml-2 bg-brand-purple hover:bg-brand-purple">
              {unreadCount}
            </Badge>
          )}
        </div>
        
        {taskRelated && (
          <div className="mt-1">
            <Badge variant="outline" className="text-xs">
              Re: {taskRelated.title}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCard;
