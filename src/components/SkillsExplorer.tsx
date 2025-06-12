import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Database, 
  Server, 
  Layout, 
  Pencil, 
  BarChart, 
  Video, 
  Search, 
  Languages, 
  BookOpen, 
  Megaphone,
  Briefcase
} from "lucide-react";

// Define our skills data structure
const skillsData = [
  {
    id: "web-development",
    name: "Web Development",
    icon: <Code className="h-5 w-5" />,
    description: "Build and maintain websites and web applications",
    subskills: [
      {
        id: "frontend",
        name: "Frontend",
        icon: <Layout className="h-4 w-4" />,
        skills: [
          { name: "HTML", level: "beginner" },
          { name: "CSS", level: "beginner" },
          { name: "JavaScript", level: "intermediate" },
          { name: "React", level: "advanced" },
          { name: "Vue", level: "advanced" },
          { name: "Angular", level: "advanced" },
          { name: "TypeScript", level: "intermediate" }
        ]
      },
      {
        id: "backend",
        name: "Backend",
        icon: <Server className="h-4 w-4" />,
        skills: [
          { name: "Node.js", level: "intermediate" },
          { name: "Python", level: "intermediate" },
          { name: "PHP", level: "intermediate" },
          { name: "Java", level: "advanced" },
          { name: "C#", level: "advanced" },
          { name: "Ruby", level: "intermediate" }
        ]
      },
      {
        id: "database",
        name: "Database",
        icon: <Database className="h-4 w-4" />,
        skills: [
          { name: "MySQL", level: "intermediate" },
          { name: "PostgreSQL", level: "intermediate" },
          { name: "MongoDB", level: "intermediate" },
          { name: "Redis", level: "advanced" },
          { name: "Firebase", level: "beginner" }
        ]
      }
    ]
  },
  {
    id: "design",
    name: "Design",
    icon: <Pencil className="h-5 w-5" />,
    description: "Create visual concepts and designs for digital products",
    subskills: [
      {
        id: "ui-design",
        name: "UI Design",
        icon: <Layout className="h-4 w-4" />,
        skills: [
          { name: "Figma", level: "intermediate" },
          { name: "Adobe XD", level: "intermediate" },
          { name: "Sketch", level: "advanced" },
          { name: "Prototyping", level: "intermediate" },
          { name: "Wireframing", level: "beginner" },
          { name: "User Interface Design", level: "intermediate" }
        ]
      },
      {
        id: "graphic-design",
        name: "Graphic Design",
        icon: <Pencil className="h-4 w-4" />,
        skills: [
          { name: "Photoshop", level: "intermediate" },
          { name: "Illustrator", level: "intermediate" },
          { name: "InDesign", level: "advanced" },
          { name: "Typography", level: "intermediate" },
          { name: "Logo Design", level: "beginner" },
          { name: "Brand Identity", level: "intermediate" }
        ]
      }
    ]
  },
  {
    id: "data",
    name: "Data Science",
    icon: <BarChart className="h-5 w-5" />,
    description: "Analyze and interpret complex data to inform decision-making",
    subskills: [
      {
        id: "analysis",
        name: "Data Analysis",
        icon: <BarChart className="h-4 w-4" />,
        skills: [
          { name: "Excel", level: "beginner" },
          { name: "Python", level: "intermediate" },
          { name: "R", level: "intermediate" },
          { name: "SQL", level: "intermediate" },
          { name: "Tableau", level: "intermediate" }
        ]
      },
      {
        id: "machine-learning",
        name: "Machine Learning",
        icon: <BarChart className="h-4 w-4" />,
        skills: [
          { name: "TensorFlow", level: "advanced" },
          { name: "PyTorch", level: "advanced" },
          { name: "Scikit-learn", level: "intermediate" },
          { name: "Natural Language Processing", level: "advanced" }
        ]
      }
    ]
  },
  {
    id: "content",
    name: "Content Creation",
    icon: <BookOpen className="h-5 w-5" />,
    description: "Create engaging content for various platforms and audiences",
    subskills: [
      {
        id: "writing",
        name: "Writing",
        icon: <Pencil className="h-4 w-4" />,
        skills: [
          { name: "Blog Writing", level: "beginner" },
          { name: "Copywriting", level: "intermediate" },
          { name: "Technical Writing", level: "advanced" },
          { name: "SEO Writing", level: "intermediate" }
        ]
      },
      {
        id: "video",
        name: "Video Production",
        icon: <Video className="h-4 w-4" />,
        skills: [
          { name: "Video Editing", level: "intermediate" },
          { name: "Animation", level: "advanced" },
          { name: "Scriptwriting", level: "intermediate" },
          { name: "After Effects", level: "advanced" }
        ]
      }
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: <Megaphone className="h-5 w-5" />,
    description: "Promote products, services, or content to target audiences",
    subskills: [
      {
        id: "digital-marketing",
        name: "Digital Marketing",
        icon: <Search className="h-4 w-4" />,
        skills: [
          { name: "SEO", level: "intermediate" },
          { name: "Social Media Marketing", level: "intermediate" },
          { name: "Email Marketing", level: "intermediate" },
          { name: "Content Marketing", level: "intermediate" },
          { name: "Google Analytics", level: "intermediate" }
        ]
      },
      {
        id: "growth",
        name: "Growth Marketing",
        icon: <BarChart className="h-4 w-4" />,
        skills: [
          { name: "A/B Testing", level: "intermediate" },
          { name: "User Acquisition", level: "advanced" },
          { name: "Retention Strategies", level: "advanced" },
          { name: "Conversion Optimization", level: "intermediate" }
        ]
      }
    ]
  },
  {
    id: "management",
    name: "Project Management",
    icon: <Briefcase className="h-5 w-5" />,
    description: "Plan, organize, and oversee projects to achieve specific goals",
    subskills: [
      {
        id: "methodologies",
        name: "Methodologies",
        icon: <BookOpen className="h-4 w-4" />,
        skills: [
          { name: "Agile", level: "intermediate" },
          { name: "Scrum", level: "intermediate" },
          { name: "Kanban", level: "intermediate" },
          { name: "Waterfall", level: "beginner" }
        ]
      },
      {
        id: "tools",
        name: "Tools",
        icon: <Briefcase className="h-4 w-4" />,
        skills: [
          { name: "Jira", level: "intermediate" },
          { name: "Asana", level: "intermediate" },
          { name: "Trello", level: "beginner" },
          { name: "Microsoft Project", level: "advanced" }
        ]
      }
    ]
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'intermediate':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'advanced':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

export function SkillsExplorer() {
  const [expandedSkills, setExpandedSkills] = useState<string[]>([]);

  const toggleExpand = (skillId: string) => {
    setExpandedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId) 
        : [...prev, skillId]
    );
  };

  return (
    <Tabs defaultValue={skillsData[0].id} className="w-full">
      <TabsList className="flex flex-wrap h-auto mb-4 bg-muted/50">
        {skillsData.map((skill) => (
          <TabsTrigger 
            key={skill.id} 
            value={skill.id}
            className="flex items-center gap-2 py-2"
          >
            {skill.icon}
            {skill.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {skillsData.map((skill) => (
        <TabsContent key={skill.id} value={skill.id} className="pt-2">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">{skill.name}</h3>
            <p className="text-muted-foreground">{skill.description}</p>
          </div>

          <Accordion type="multiple" value={expandedSkills} className="border rounded-lg">
            {skill.subskills.map((subskill) => (
              <AccordionItem key={subskill.id} value={subskill.id}>
                <AccordionTrigger 
                  onClick={() => toggleExpand(subskill.id)}
                  className="px-4 hover:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    {subskill.icon}
                    <span>{subskill.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {subskill.skills.map((item, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline"
                        className={`justify-center py-2 ${getLevelColor(item.level)}`}
                      >
                        {item.name}
                      </Badge>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      ))}
    </Tabs>
  );
}
