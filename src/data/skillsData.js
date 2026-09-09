import { Server, Layers, Database, Wrench } from "lucide-react";

export const SKILLS = [
  {
    icon: Server,
    category: "Backend",
    items: [
      "Python",
      "Django",
      "Django REST Framework",
      "RESTful API Design",
      "RBAC",
      "Django MVT",
      "OOP",
    ],
  },
  {
    icon: Layers,
    category: "Frontend",
    items: [
      "React.js",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Bootstrap 5",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    icon: Database,
    category: "Databases",
    items: [
      "PostgreSQL",
      "MySQL",
      "ORM Optimization",
      "Relational Schema Design",
      "Query/Index Tuning",
    ],
  },
  {
    icon: Wrench,
    category: "Tools & Deployment",
    items: ["Git", "GitHub", "VS Code", "Postman", "Vercel", "Render", "CI/CD"],
  },
];