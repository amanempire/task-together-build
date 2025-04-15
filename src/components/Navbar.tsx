
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, Bell, MessageSquare, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  isLoggedIn?: boolean;
}

const Navbar = ({ isLoggedIn = false }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-brand-purple p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            </div>
            <span className="text-xl font-bold">TaskTogether</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {isLoggedIn ? (
            <>
              <nav className="flex items-center gap-4">
                <Link
                  to="/home"
                  className="text-sm font-medium transition-colors hover:text-brand-purple"
                >
                  Home
                </Link>
                <Link
                  to="/create-task"
                  className="text-sm font-medium transition-colors hover:text-brand-purple"
                >
                  Create Task
                </Link>
                <Link
                  to="/messages"
                  className="text-sm font-medium transition-colors hover:text-brand-purple"
                >
                  Messages
                </Link>
              </nav>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Notifications"
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-brand-purple"></span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Messages"
                  className="relative"
                >
                  <MessageSquare className="h-5 w-5" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                          alt="Avatar"
                        />
                        <AvatarFallback>PH</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex cursor-pointer gap-2">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex cursor-pointer gap-2 text-destructive focus:text-destructive">
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container pb-4 md:hidden">
          {isLoggedIn ? (
            <div className="flex flex-col space-y-4">
              <Link
                to="/home"
                className="text-sm font-medium transition-colors hover:text-brand-purple"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/create-task"
                className="text-sm font-medium transition-colors hover:text-brand-purple"
                onClick={toggleMenu}
              >
                Create Task
              </Link>
              <Link
                to="/messages"
                className="text-sm font-medium transition-colors hover:text-brand-purple"
                onClick={toggleMenu}
              >
                Messages
              </Link>
              <Link
                to="/profile"
                className="text-sm font-medium transition-colors hover:text-brand-purple"
                onClick={toggleMenu}
              >
                Profile
              </Link>
              <Button variant="destructive" size="sm" className="mt-2 w-full">
                Log Out
              </Button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link to="/login" onClick={toggleMenu}>
                <Button variant="outline" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link to="/signup" onClick={toggleMenu}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
