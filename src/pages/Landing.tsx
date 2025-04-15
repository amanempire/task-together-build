
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Code, Lightbulb, Pencil, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Landing = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="overflow-hidden bg-gradient-to-b from-white to-brand-purple-light py-16 md:py-24">
          <div className="container flex flex-col items-center text-center">
            <h1 className="animate-fade-in text-4xl font-bold tracking-tight md:text-6xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-purple-dark">
                Build Together.
              </span>{" "}
              <br className="hidden sm:inline" />
              <span className="mt-2 inline-block">Grow Together.</span>
            </h1>
            <p className="animate-fade-in mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              TaskTogether is a collaborative platform where everyone can post tasks
              and contribute to others. Share your skills, find help, and grow
              together as a community.
            </p>
            <div className="animate-fade-in mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link to="/signup">
                <Button size="lg" className="min-w-[160px] btn-hover">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="min-w-[160px]">
                  Log In
                </Button>
              </Link>
            </div>
            <div className="animate-scale-in mt-16 flex flex-col justify-center rounded-xl border bg-card/50 p-8 shadow-lg backdrop-blur-sm md:flex-row md:gap-8 md:p-12">
              <div className="relative mx-auto mb-8 h-[300px] w-full max-w-md md:mb-0 md:h-[400px] md:max-w-sm">
                <div className="absolute left-0 top-0 h-[280px] w-[220px] rounded-lg border bg-white p-4 shadow-md">
                  <div className="space-y-2">
                    <div className="h-6 w-24 rounded bg-brand-purple/20"></div>
                    <div className="h-4 w-full rounded bg-gray-100"></div>
                    <div className="h-4 w-3/4 rounded bg-gray-100"></div>
                    <div className="h-4 w-5/6 rounded bg-gray-100"></div>
                    <div className="h-24 w-full rounded bg-gray-100"></div>
                    <div className="flex flex-wrap gap-2">
                      <div className="h-6 w-16 rounded-full bg-brand-purple/10"></div>
                      <div className="h-6 w-20 rounded-full bg-brand-purple/10"></div>
                    </div>
                    <div className="mt-4 h-8 w-full rounded bg-brand-purple"></div>
                  </div>
                </div>
                <div className="absolute right-0 top-16 h-[280px] w-[220px] rounded-lg border bg-white p-4 shadow-md">
                  <div className="space-y-2">
                    <div className="h-6 w-24 rounded bg-brand-purple/20"></div>
                    <div className="h-4 w-full rounded bg-gray-100"></div>
                    <div className="h-4 w-3/4 rounded bg-gray-100"></div>
                    <div className="h-4 w-5/6 rounded bg-gray-100"></div>
                    <div className="h-24 w-full rounded bg-gray-100"></div>
                    <div className="flex flex-wrap gap-2">
                      <div className="h-6 w-16 rounded-full bg-brand-purple/10"></div>
                      <div className="h-6 w-20 rounded-full bg-brand-purple/10"></div>
                    </div>
                    <div className="mt-4 h-8 w-full rounded bg-brand-purple"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                How TaskTogether Works
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our platform makes collaboration simple and rewarding for everyone
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="card-hover">
                <CardContent className="flex flex-col items-center gap-4 pt-8">
                  <div className="rounded-full bg-brand-purple-light p-3">
                    <Pencil className="h-6 w-6 text-brand-purple" />
                  </div>
                  <h3 className="text-xl font-semibold">Post Tasks</h3>
                  <p className="text-center text-muted-foreground">
                    Create and post tasks that you need help with. Specify skills 
                    required, deadlines, and rewards.
                  </p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="flex flex-col items-center gap-4 pt-8">
                  <div className="rounded-full bg-brand-purple-light p-3">
                    <Users className="h-6 w-6 text-brand-purple" />
                  </div>
                  <h3 className="text-xl font-semibold">Find Contributors</h3>
                  <p className="text-center text-muted-foreground">
                    Connect with skilled contributors who can help bring your project 
                    to life. Review applications and select the best fit.
                  </p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="flex flex-col items-center gap-4 pt-8">
                  <div className="rounded-full bg-brand-purple-light p-3">
                    <Code className="h-6 w-6 text-brand-purple" />
                  </div>
                  <h3 className="text-xl font-semibold">Contribute</h3>
                  <p className="text-center text-muted-foreground">
                    Browse available tasks that match your skills. Apply to contribute 
                    and showcase your abilities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-accent py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                More Than Just Tasks
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                TaskTogether is designed to help everyone grow while building together
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex flex-col gap-4 rounded-xl border bg-card p-8">
                <div className="rounded-full bg-brand-purple-light p-3 w-fit">
                  <Lightbulb className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-semibold">Dual Roles</h3>
                <p className="text-muted-foreground">
                  Everyone can be both a Founder posting tasks and a Contributor 
                  completing them. This unique approach creates a balanced 
                  community where skills are shared freely.
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-brand-purple" />
                    <span>Post tasks when you need help</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-brand-purple" />
                    <span>Contribute when you have the skills</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-brand-purple" />
                    <span>Build your profile in both directions</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-4 rounded-xl border bg-card p-8">
                <div className="rounded-full bg-brand-purple-light p-3 w-fit">
                  <Users className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-semibold">Build Your Network</h3>
                <p className="text-muted-foreground">
                  Every task is an opportunity to connect with talented individuals. 
                  TaskTogether helps you build a network of collaborators while 
                  showcasing your own abilities.
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-brand-purple" />
                    <span>Message directly within the platform</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-brand-purple" />
                    <span>Build long-term collaborative relationships</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-brand-purple" />
                    <span>Grow your professional network</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="rounded-xl bg-gradient-to-r from-brand-purple to-brand-purple-dark p-8 md:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Ready to Join the Community?
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Start posting tasks and contributing today. Join thousands of other
                  collaborators making amazing things together.
                </p>
                <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
                  <Link to="/signup">
                    <Button size="lg" className="min-w-[160px] bg-white text-brand-purple hover:bg-white/90">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/how-it-works">
                    <Button size="lg" variant="outline" className="min-w-[160px] border-white text-white hover:bg-white/10">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Landing;
