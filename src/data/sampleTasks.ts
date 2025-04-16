import { TaskCardProps } from "@/components/TaskCard";

// Sample data for tasks
export const sampleTasks: TaskCardProps[] = [
  {
    id: "1",
    title: "Build a responsive landing page",
    description: "Need a skilled frontend developer to create a responsive landing page for my startup. Design mockups are ready.",
    skills: ["Web Development", "HTML", "CSS", "React"],
    deadline: "2025-05-20",
    reward: "$200",
    postedBy: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    status: "open",
    subtasks: [
      {
        id: "1-1",
        title: "Create header section",
        completed: true,
        subtasks: [
          {
            id: "1-1-1",
            title: "Design navigation menu",
            completed: true,
            subtasks: [
              {
                id: "1-1-1-1",
                title: "Create mobile menu toggle",
                completed: false
              },
              {
                id: "1-1-1-2",
                title: "Style dropdown menus",
                completed: false
              }
            ]
          },
          {
            id: "1-1-2",
            title: "Implement responsive logo",
            completed: false
          }
        ]
      },
      {
        id: "1-2",
        title: "Build hero section with CTA",
        completed: false,
        subtasks: [
          {
            id: "1-2-1",
            title: "Design hero image",
            completed: false
          },
          {
            id: "1-2-2",
            title: "Write compelling headline",
            completed: false
          }
        ]
      },
      {
        id: "1-3",
        title: "Create testimonials carousel",
        completed: false
      }
    ]
  },
  {
    id: "2",
    title: "Logo design for tech company",
    description: "Looking for a creative designer to craft a modern, clean logo for a B2B SaaS company. Must represent innovation and trust.",
    skills: ["Graphic Design", "Logo Design", "Branding"],
    deadline: "2025-05-10",
    reward: "$150",
    postedBy: {
      name: "Sarah Miller",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    status: "open",
    subtasks: [
      {
        id: "2-1",
        title: "Research competitor logos",
        completed: true,
      },
      {
        id: "2-2",
        title: "Create 3 initial concepts",
        completed: false,
      },
      {
        id: "2-3",
        title: "Finalize design with revisions",
        completed: false,
      }
    ]
  },
  {
    id: "3",
    title: "Content writing for blog",
    description: "Need articles written about tech trends. Each article should be 1500-2000 words with proper research and SEO optimization.",
    skills: ["Content Writing", "SEO", "Research"],
    deadline: "2025-05-15",
    reward: "$100 per article",
    postedBy: {
      name: "Mike Roberts",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    status: "open",
  },
  {
    id: "4",
    title: "Mobile app UI design",
    description: "Looking for a UI/UX designer to create modern, clean interfaces for a fitness tracking mobile app. Experience with fitness apps is a plus.",
    skills: ["UI/UX Design", "Mobile Design", "Figma"],
    deadline: "2025-05-25",
    reward: "$300",
    postedBy: {
      name: "Emma Chang",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    status: "open",
  },
];

// Sample data for my tasks
export const myTasks: TaskCardProps[] = [
  {
    id: "5",
    title: "Social media strategy",
    description: "Need help creating a comprehensive social media strategy for my small business. Focus on Instagram and TikTok growth.",
    skills: ["Social Media", "Marketing", "Content Creation"],
    deadline: "2025-05-18",
    reward: "$250",
    status: "open",
    isMyTask: true,
    subtasks: [
      {
        id: "5-1",
        title: "Competitive analysis",
        completed: true,
        subtasks: [
          {
            id: "5-1-1",
            title: "Research top 5 competitors",
            completed: true
          },
          {
            id: "5-1-2",
            title: "Analyze engagement metrics",
            completed: false
          }
        ]
      },
      {
        id: "5-2",
        title: "Content calendar for first month",
        completed: false
      },
      {
        id: "5-3",
        title: "KPI definition and tracking plan",
        completed: false
      }
    ]
  },
  {
    id: "6",
    title: "Video editing for YouTube",
    description: "Looking for someone to edit my tech review videos. Need intro/outro, transitions, and basic effects. 10-15 minute videos.",
    skills: ["Video Editing", "Adobe Premiere", "After Effects"],
    deadline: "2025-05-12",
    reward: "$150 per video",
    status: "in-progress",
    isMyTask: true,
    contributors: [
      {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      },
    ],
    subtasks: [
      {
        id: "6-1",
        title: "Edit intro sequence",
        completed: true,
      },
      {
        id: "6-2",
        title: "Cut interview segments",
        completed: true,
      },
      {
        id: "6-3",
        title: "Add music and sound effects",
        completed: false,
      },
      {
        id: "6-4",
        title: "Export final version",
        completed: false,
      }
    ]
  },
];
