
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-md text-center">
          <h1 className="text-8xl font-bold text-brand-purple">404</h1>
          <h2 className="mt-4 text-2xl font-bold">Page Not Found</h2>
          <p className="mt-2 text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button className="mt-6">
              Return to Home
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
