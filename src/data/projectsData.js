// Import images for FreshCart
import freshcartHome from "../assets/projects/freshcart/freshcart-home.png";
import freshcartProducts from "../assets/projects/freshcart/freshcart-products.png";
import freshcartCart from "../assets/projects/freshcart/freshcart-cart.png";
import freshcartCheckout from "../assets/projects/freshcart/freshcart-checkout.png";

// Import images for CarePlus
import careplusHome from "../assets/projects/careplus/careplus-home.png";
import careplusProducts from "../assets/projects/careplus/careplus-products.png";
import careplusDashboard from "../assets/projects/careplus/careplus-dashboard.png";
import careplusLogin from "../assets/projects/careplus/careplus-login.png";

// Import images for Aura Expeditions
import auraHome from "../assets/projects/aura/aura-home.png";
import auraPackages from "../assets/projects/aura/aura-packages.png";
import auraAbout from "../assets/projects/aura/aura-about.png";
import auraContact from "../assets/projects/aura/aura-contact.png";

// Import images for Thozhilji Construction
import thozhiljiHome from "../assets/projects/thozhilji/thozhilji-home.png";
import thozhiljiServices from "../assets/projects/thozhilji/thozhilji-services.png";
import thozhiljiProjects from "../assets/projects/thozhilji/thozhilji-projects.png";
import thozhiljiContact from "../assets/projects/thozhilji/thozhilji-contact.png";

// Import images for College Management System
import collegeHome from "../assets/projects/college/college-home.png";
import collegeStudents from "../assets/projects/college/college-students.png";
import collegeFaculty from "../assets/projects/college/college-faculty.png";
import collegeDashboard from "../assets/projects/college/college-dashboard.png";

// Import images for BloodBank
import bloodbankHome from "../assets/projects/bloodbank/bloodbank-home.png";
import bloodbankDonors from "../assets/projects/bloodbank/bloodbank-donors.png";
import bloodbankRequests from "../assets/projects/bloodbank/bloodbank-requests.png";
import bloodbankDashboard from "../assets/projects/bloodbank/bloodbank-dashboard.png";

export const PROJECTS = [
  {
    id: 1,
    title: "FreshCart",
    description: "Full-featured e-commerce platform for fresh groceries and daily essentials with real-time inventory, 1-hour delivery, and seamless checkout experience.",
    coverImage: freshcartHome,
    images: [
      freshcartHome,
      freshcartProducts,
      freshcartCart,
      freshcartCheckout,
    ],
    features: [
      "Real-time inventory management with automated stock updates",
      "1-hour delivery scheduling with live tracking",
      "Seamless checkout with multiple payment gateways",
      "Farm fresh produce categorization and filtering"
    ],
    tech: ["React", "Django", "PostgreSQL", "Tailwind CSS", "Redis"],
    liveLink: "https://freshcart-demo.com",
    githubLink: "https://github.com/subinpk8088-pydj/FRESHCART-SUPERMARKET",
    category: "E-Commerce"
  },
  {
    id: 2,
    title: "CarePlus",
    description: "Hygiene Products E-Commerce Platform — a responsive e-commerce web application built for hygiene and essential products, offering a smooth user experience with modern UI and powerful dashboard-based management.",
    coverImage: careplusHome,
    images: [
      careplusHome,
      careplusProducts,
      careplusDashboard,
      careplusLogin,
    ],
    features: [
      "User Registration & Login with secure authentication",
      "Product Search & Filtering for easy product discovery",
      "Wishlist Management & Product Ratings & Reviews",
      "Modern Admin Dashboard with User, Product & Category Management",
      "Hero banners, Blog section, News & updates, About section",
      "Fully responsive and mobile-friendly layout"
    ],
    tech: ["Django", "Bootstrap 5", "JavaScript", "PostgreSQL", "HTML5", "CSS3"],
    liveLink: "https://careplus-demo.com",
    githubLink: "https://github.com/subinpk8088-pydj/Ecommerce-client",
    category: "E-Commerce"
  },
  {
    id: 3,
    title: "Aura Expeditions",
    description: "Fictional travel agency site offering curated tours across Kerala's backwaters, Himalayan peaks, and iconic international destinations. Features include search, filterable packages, about page with team/stats, and contact form.",
    coverImage: auraHome,
    images: [
      auraHome,
      auraPackages,
      auraAbout,
      auraContact,
    ],
    features: [
      "Curated tour packages with search and filter functionality",
      "About page with team profiles and company stats",
      "Contact form with WhatsApp booking integration",
      "Testimonials section with customer reviews",
      "Fully responsive design with smooth animations",
      "Destination search with date and guest selection"
    ],
    tech: ["React", "Tailwind CSS", "Framer Motion", "WhatsApp API"],
    liveLink: "https://aura-expeditions-demo.com",
    githubLink: "https://github.com/subinpk8088-pydj/aura-expeditions",
    category: "Full-Stack"
  },
  {
    id: 4,
    title: "Thozhilji Construction",
    description: "Professional construction company website showcasing residential and commercial building services, with a portfolio of completed projects, service details, and easy contact options.",
    coverImage: thozhiljiHome,
    images: [
      thozhiljiHome,
      thozhiljiServices,
      thozhiljiProjects,
      thozhiljiContact,
    ],
    features: [
      "Service showcase for residential and commercial construction",
      "Project portfolio with completed work gallery",
      "Contact forms with call-to-action buttons",
      "Trusted workmanship and quality materials showcase",
      "Modern finishing and construction expertise",
      "Fully responsive with professional branding"
    ],
    tech: ["React", "Tailwind CSS", "Framer Motion", "EmailJS"],
    liveLink: "https://thozhilji-construction-demo.com",
    githubLink: "https://github.com/subinpk8088-pydj/thozhilji-construction",
    category: "Full-Stack"
  },
  {
    id: 5,
    title: "College Management System",
    description: "A comprehensive full-stack Django application for managing students, faculty, courses, attendance, and administrative operations within an educational institution with secure role-based access.",
    coverImage: collegeHome,
    images: [
      collegeHome,
      collegeStudents,
      collegeFaculty,
      collegeDashboard,
    ],
    features: [
      "Secure role-based authentication for Students, Staff, and Admin",
      "Student enrollment, course management, and attendance tracking",
      "Faculty portal with course handling and grading systems",
      "Centralized admin dashboard with full CRUD operations",
      "Fee management, payment tracking, and financial reporting",
      "Data-driven analytics for academic performance insights",
      "Responsive and user-friendly interface for all users"
    ],
    tech: ["Python", "Django", "Bootstrap 5", "PostgreSQL", "Git"],
    liveLink: "https://college-management-demo.com",
    githubLink: "https://github.com/subinpk8088-pydj/college-management",
    category: "Full-Stack"
  },
  {
    id: 6,
    title: "BloodBank",
    description: "A centralized hospital blood bank management system featuring an admin dashboard for managing donors, patients, doctors, blood requests, appointments, reports, and system notifications, with role-based access and streamlined administrative workflows.",
    coverImage: bloodbankHome,
    images: [
      bloodbankHome,
      bloodbankDonors,
      bloodbankRequests,
      bloodbankDashboard,
    ],
    features: [
      "Centralized blood bank management with real-time inventory tracking",
      "Donor management with blood type and donation history",
      "Blood request handling with emergency priority system",
      "Patient and doctor management with appointment scheduling",
      "Admin dashboard with reports and system notifications",
      "Role-based access control for different user types",
      "Emergency blood request alerts and response tracking"
    ],
    tech: ["Python", "Django", "Bootstrap 5", "PostgreSQL", "JavaScript"],
    liveLink: "https://bloodbank-demo.com",
    githubLink: "https://github.com/subinpk8088-pydj/bloodbank",
    category: "Full-Stack"
  }
];