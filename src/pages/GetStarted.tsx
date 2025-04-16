
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SkillsExplorer } from "@/components/SkillsExplorer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container max-w-5xl">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">Get Started with TaskTogether</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore skills and find tasks that match your expertise or learn something new by collaborating with others
              </p>
            </div>

            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle>Explore Skills</CardTitle>
                <CardDescription>
                  Browse through different skill categories to find tasks that match your expertise or interests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SkillsExplorer />
              </CardContent>
            </Card>

            <div className="text-center space-y-4 pt-8">
              <h2 className="text-2xl font-semibold">Ready to start collaborating?</h2>
              <div className="flex justify-center gap-4">
                <Button onClick={() => navigate("/profile-setup")} size="lg">
                  Complete Your Profile
                </Button>
                <Button onClick={() => navigate("/home")} variant="outline" size="lg">
                  Browse Tasks
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GetStarted;
