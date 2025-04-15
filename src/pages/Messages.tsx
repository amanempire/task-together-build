
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Send, PaperclipIcon, User, ArrowUp } from "lucide-react";
import MessageCard, { MessageCardProps } from "@/components/MessageCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample messages data
const messagesData: MessageCardProps[] = [
  {
    id: "1",
    user: {
      name: "Sarah Miller",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    lastMessage: "I'm interested in your logo design task. Could you tell me more about the brand identity?",
    timestamp: "10:23 AM",
    unreadCount: 2,
    taskRelated: {
      id: "2",
      title: "Logo design for tech company",
    },
  },
  {
    id: "2",
    user: {
      name: "Mike Roberts",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    lastMessage: "Thanks for accepting my application! When would be a good time to discuss the requirements?",
    timestamp: "Yesterday",
    unreadCount: 0,
    taskRelated: {
      id: "3",
      title: "Content writing for blog",
    },
  },
  {
    id: "3",
    user: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    lastMessage: "I've just sent you the first draft of the landing page. Please let me know your thoughts!",
    timestamp: "Apr 10",
    unreadCount: 0,
    taskRelated: {
      id: "1",
      title: "Build a responsive landing page",
    },
  },
  {
    id: "4",
    user: {
      name: "Emma Chang",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    lastMessage: "I got your message about the UI changes. Let's set up a call to discuss them.",
    timestamp: "Apr 8",
    unreadCount: 0,
  },
];

// Sample conversation data
const conversationData = [
  {
    id: "msg1",
    sender: {
      id: "user1",
      name: "Sarah Miller",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    content: "Hi there! I noticed your task for logo design. I have experience in creating logos for tech companies and would love to help you with this project.",
    timestamp: "Apr 14, 10:05 AM",
    isMe: false,
  },
  {
    id: "msg2",
    sender: {
      id: "me",
      name: "You",
      avatar: "",
    },
    content: "Hello Sarah! Thanks for reaching out. I'm looking for a minimalist logo that represents our software development services. Do you have any examples of your previous work?",
    timestamp: "Apr 14, 10:12 AM",
    isMe: true,
  },
  {
    id: "msg3",
    sender: {
      id: "user1",
      name: "Sarah Miller",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    content: "Of course! I'll send you my portfolio. I specialize in clean, modern designs that work well across different mediums. Could you tell me more about your company's values and target audience?",
    timestamp: "Apr 14, 10:18 AM",
    isMe: false,
  },
  {
    id: "msg4",
    sender: {
      id: "user1",
      name: "Sarah Miller",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    content: "Here's my portfolio with some examples of tech logos I've designed:",
    timestamp: "Apr 14, 10:20 AM",
    isMe: false,
    attachment: {
      type: "pdf",
      name: "sarah_miller_portfolio.pdf",
      size: "3.2 MB",
    },
  },
  {
    id: "msg5",
    sender: {
      id: "me",
      name: "You",
      avatar: "",
    },
    content: "These look great! Our company focuses on enterprise software solutions. We value reliability, innovation, and efficiency. Our target audience is mainly IT managers and CIOs of mid to large companies.",
    timestamp: "Apr 14, 10:23 AM",
    isMe: true,
  },
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(messagesData[0]);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState(conversationData);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage = {
      id: `msg${messages.length + 1}`,
      sender: {
        id: "me",
        name: "You",
        avatar: "",
      },
      content: messageText,
      timestamp: "Just now",
      isMe: true,
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isLoggedIn={true} />
      
      <main className="flex-1 py-8">
        <div className="container">
          <h1 className="mb-6 text-3xl font-bold tracking-tight">Messages</h1>
          
          <div className="grid min-h-[600px] overflow-hidden rounded-lg border shadow-sm md:grid-cols-3">
            {/* Sidebar with conversations */}
            <div className="border-r bg-muted/10">
              <div className="p-4">
                <Input
                  placeholder="Search messages..."
                  className="bg-background"
                />
              </div>
              <div className="h-[calc(600px-60px)] overflow-y-auto">
                {messagesData.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedConversation(message)}
                  >
                    <MessageCard
                      {...message}
                      isActive={selectedConversation.id === message.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Conversation area */}
            <div className="flex flex-col md:col-span-2">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={selectedConversation.user.avatar}
                      alt={selectedConversation.user.name}
                    />
                    <AvatarFallback>
                      {selectedConversation.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">
                      {selectedConversation.user.name}
                    </h3>
                    {selectedConversation.taskRelated && (
                      <Badge variant="outline" className="text-xs">
                        Re: {selectedConversation.taskRelated.title}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {/* View profile */}}
                >
                  <User className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isMe
                          ? "bg-brand-purple text-white"
                          : "bg-accent"
                      }`}
                    >
                      {!message.isMe && (
                        <div className="mb-1 flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={message.sender.avatar}
                              alt={message.sender.name}
                            />
                            <AvatarFallback className="text-xs">
                              {message.sender.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium">
                            {message.sender.name}
                          </span>
                        </div>
                      )}
                      <p className={message.isMe ? "text-white" : "text-foreground"}>
                        {message.content}
                      </p>
                      {message.attachment && (
                        <div className={`mt-2 flex items-center gap-2 rounded-md border p-2 ${
                          message.isMe ? "bg-brand-purple-dark border-white/20" : "bg-background"
                        }`}>
                          <PaperclipIcon className="h-4 w-4" />
                          <span className="text-sm">{message.attachment.name}</span>
                          <span className="text-xs opacity-70">
                            {message.attachment.size}
                          </span>
                        </div>
                      )}
                      <div className={`mt-1 text-right text-xs ${
                        message.isMe ? "text-white/80" : "text-muted-foreground"
                      }`}>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message input */}
              <div className="border-t p-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={() => {/* Attach file */}}
                  >
                    <PaperclipIcon className="h-5 w-5" />
                  </Button>
                  <div className="relative flex-1">
                    <Input
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="pr-10"
                    />
                    {messageText && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={handleSendMessage}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Button
                    className="shrink-0"
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messages;
