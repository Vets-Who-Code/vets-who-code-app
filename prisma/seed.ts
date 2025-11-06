import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Starting database seed...");

    // Create Web Development Course
    const webDevCourse = await prisma.course.upsert({
        where: { id: "web-development" },
        update: {},
        create: {
            id: "web-development",
            title: "Web Development",
            description: "Build modern, responsive web applications from frontend to backend",
            imageUrl: "/images/courses/web-development.jpg",
            difficulty: "BEGINNER",
            category: "Web Development",
            isPublished: true,
            duration: 158,
            prerequisites: JSON.stringify(["Basic computer literacy", "Willingness to learn"]),
        },
    });

    console.log("✓ Created Web Development course");

    // Create modules and lessons for Web Development
    const modules = [
        {
            title: "HTML Fundamentals",
            description: "Learn the building blocks of the web with semantic HTML",
            order: 1,
            lessons: [
                {
                    title: "Introduction to HTML",
                    content: "Learn the basics of HTML and how to structure web pages.",
                    order: 1,
                    type: "CONTENT" as const,
                    duration: 30,
                },
                {
                    title: "HTML Elements and Tags",
                    content: "Understand the different HTML elements and how to use them.",
                    order: 2,
                    type: "CONTENT" as const,
                    duration: 45,
                },
                {
                    title: "Semantic HTML",
                    content: "Learn about semantic HTML and why it's important for accessibility and SEO.",
                    order: 3,
                    type: "CONTENT" as const,
                    duration: 40,
                },
                {
                    title: "HTML Forms",
                    content: "Master HTML forms and input elements.",
                    order: 4,
                    type: "EXERCISE" as const,
                    duration: 60,
                },
            ],
        },
        {
            title: "CSS Styling & Layout",
            description: "Master styling, flexbox, grid, and responsive design",
            order: 2,
            lessons: [
                {
                    title: "CSS Basics",
                    content: "Introduction to CSS syntax, selectors, and properties.",
                    order: 1,
                    type: "CONTENT" as const,
                    duration: 45,
                },
                {
                    title: "The Box Model",
                    content: "Understanding margin, padding, border, and content.",
                    order: 2,
                    type: "CONTENT" as const,
                    duration: 40,
                },
                {
                    title: "Flexbox Layout",
                    content: "Learn how to create flexible layouts with CSS Flexbox.",
                    order: 3,
                    type: "EXERCISE" as const,
                    duration: 60,
                },
                {
                    title: "CSS Grid",
                    content: "Master CSS Grid for complex layouts.",
                    order: 4,
                    type: "EXERCISE" as const,
                    duration: 60,
                },
                {
                    title: "Responsive Design",
                    content: "Create websites that work on all devices using media queries.",
                    order: 5,
                    type: "PROJECT" as const,
                    duration: 90,
                },
            ],
        },
        {
            title: "JavaScript Basics",
            description: "Variables, functions, DOM manipulation, and events",
            order: 3,
            lessons: [
                {
                    title: "JavaScript Introduction",
                    content: "Learn the fundamentals of JavaScript programming.",
                    order: 1,
                    type: "CONTENT" as const,
                    duration: 45,
                },
                {
                    title: "Variables and Data Types",
                    content: "Understanding variables, strings, numbers, booleans, and more.",
                    order: 2,
                    type: "CONTENT" as const,
                    duration: 50,
                },
                {
                    title: "Functions",
                    content: "Create reusable code with functions.",
                    order: 3,
                    type: "EXERCISE" as const,
                    duration: 60,
                },
                {
                    title: "DOM Manipulation",
                    content: "Learn how to interact with HTML elements using JavaScript.",
                    order: 4,
                    type: "EXERCISE" as const,
                    duration: 70,
                },
                {
                    title: "Event Handling",
                    content: "Respond to user interactions with event listeners.",
                    order: 5,
                    type: "PROJECT" as const,
                    duration: 90,
                },
            ],
        },
        {
            title: "Modern JavaScript",
            description: "ES6+, async/await, modules, and best practices",
            order: 4,
            lessons: [
                {
                    title: "ES6 Features",
                    content: "Arrow functions, destructuring, spread operator, and template literals.",
                    order: 1,
                    type: "CONTENT" as const,
                    duration: 50,
                },
                {
                    title: "Async JavaScript",
                    content: "Callbacks, promises, and async/await.",
                    order: 2,
                    type: "CONTENT" as const,
                    duration: 60,
                },
                {
                    title: "Modules",
                    content: "Organize your code with ES6 modules.",
                    order: 3,
                    type: "EXERCISE" as const,
                    duration: 45,
                },
                {
                    title: "API Calls",
                    content: "Fetch data from APIs using fetch and axios.",
                    order: 4,
                    type: "PROJECT" as const,
                    duration: 90,
                },
            ],
        },
        {
            title: "React Fundamentals",
            description: "Components, state, props, and hooks",
            order: 5,
            lessons: [
                {
                    title: "Introduction to React",
                    content: "Learn what React is and why it's popular.",
                    order: 1,
                    type: "CONTENT" as const,
                    duration: 40,
                },
                {
                    title: "Components and JSX",
                    content: "Create reusable UI components with JSX.",
                    order: 2,
                    type: "EXERCISE" as const,
                    duration: 60,
                },
                {
                    title: "Props and State",
                    content: "Pass data between components and manage component state.",
                    order: 3,
                    type: "EXERCISE" as const,
                    duration: 70,
                },
                {
                    title: "React Hooks",
                    content: "useState, useEffect, and custom hooks.",
                    order: 4,
                    type: "EXERCISE" as const,
                    duration: 80,
                },
                {
                    title: "Building a React App",
                    content: "Create a complete React application.",
                    order: 5,
                    type: "PROJECT" as const,
                    duration: 120,
                },
            ],
        },
        {
            title: "React Advanced",
            description: "Context, routing, state management, and testing",
            order: 6,
            lessons: [
                {
                    title: "React Context",
                    content: "Share state across components without prop drilling.",
                    order: 1,
                    type: "CONTENT" as const,
                    duration: 50,
                },
                {
                    title: "React Router",
                    content: "Add navigation to your React applications.",
                    order: 2,
                    type: "EXERCISE" as const,
                    duration: 60,
                },
                {
                    title: "State Management",
                    content: "Learn Redux or Zustand for complex state management.",
                    order: 3,
                    type: "EXERCISE" as const,
                    duration: 80,
                },
                {
                    title: "Testing React Apps",
                    content: "Write tests with Jest and React Testing Library.",
                    order: 4,
                    type: "EXERCISE" as const,
                    duration: 70,
                },
            ],
        },
        {
            title: "Node.js & Express",
            description: "Server-side JavaScript and API development",
            order: 7,
            lessons: [
                {
                    title: "Introduction to Node.js",
                    content: "Learn about Node.js and its event-driven architecture.",
                    order: 1,
                    type: "CONTENT" as const,
                    duration: 40,
                },
                {
                    title: "Express.js Basics",
                    content: "Create web servers and APIs with Express.",
                    order: 2,
                    type: "EXERCISE" as const,
                    duration: 60,
                },
                {
                    title: "RESTful API Design",
                    content: "Build RESTful APIs following best practices.",
                    order: 3,
                    type: "EXERCISE" as const,
                    duration: 70,
                },
                {
                    title: "Authentication & Security",
                    content: "Implement JWT authentication and secure your APIs.",
                    order: 4,
                    type: "PROJECT" as const,
                    duration: 90,
                },
            ],
        },
        {
            title: "Databases & Deployment",
            description: "MongoDB, PostgreSQL, and cloud deployment",
            order: 8,
            lessons: [
                {
                    title: "Database Fundamentals",
                    content: "SQL vs NoSQL and choosing the right database.",
                    order: 1,
                    type: "CONTENT" as const,
                    duration: 45,
                },
                {
                    title: "MongoDB",
                    content: "Work with MongoDB and Mongoose.",
                    order: 2,
                    type: "EXERCISE" as const,
                    duration: 60,
                },
                {
                    title: "PostgreSQL & Prisma",
                    content: "Use PostgreSQL with Prisma ORM.",
                    order: 3,
                    type: "EXERCISE" as const,
                    duration: 60,
                },
                {
                    title: "Deployment",
                    content: "Deploy your applications to Vercel, Heroku, or AWS.",
                    order: 4,
                    type: "PROJECT" as const,
                    duration: 90,
                },
            ],
        },
        {
            title: "Final Project",
            description: "Build a full-stack web application from scratch",
            order: 9,
            lessons: [
                {
                    title: "Project Planning",
                    content: "Plan your full-stack application architecture.",
                    order: 1,
                    type: "CONTENT" as const,
                    duration: 60,
                },
                {
                    title: "Frontend Development",
                    content: "Build the React frontend for your application.",
                    order: 2,
                    type: "PROJECT" as const,
                    duration: 480,
                },
                {
                    title: "Backend Development",
                    content: "Create the API and database for your application.",
                    order: 3,
                    type: "PROJECT" as const,
                    duration: 480,
                },
                {
                    title: "Testing & Deployment",
                    content: "Test and deploy your final project.",
                    order: 4,
                    type: "PROJECT" as const,
                    duration: 360,
                },
            ],
        },
    ];

    for (const moduleData of modules) {
        const { lessons, ...moduleInfo } = moduleData;

        const module = await prisma.module.upsert({
            where: {
                courseId_order: {
                    courseId: webDevCourse.id,
                    order: moduleInfo.order,
                },
            },
            update: {},
            create: {
                ...moduleInfo,
                courseId: webDevCourse.id,
            },
        });

        for (const lessonData of lessons) {
            await prisma.lesson.upsert({
                where: {
                    moduleId_order: {
                        moduleId: module.id,
                        order: lessonData.order,
                    },
                },
                update: {},
                create: {
                    ...lessonData,
                    moduleId: module.id,
                },
            });
        }

        console.log(`✓ Created module: ${moduleInfo.title} with ${lessons.length} lessons`);
    }

    // Create some sample assignments
    const assignments = [
        {
            title: "HTML Portfolio Page",
            description: "Create a personal portfolio page using HTML and CSS",
            instructions: `
# HTML Portfolio Project

Create a personal portfolio page that showcases your skills and projects.

## Requirements:
- Use semantic HTML5 elements
- Include a header with navigation
- Add an about section
- Create a projects section
- Include a contact form
- Make it responsive

## Submission:
- Submit your GitHub repository URL
- Deploy to GitHub Pages and include the live URL
            `.trim(),
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
            maxPoints: 100,
            type: "PROJECT",
            githubRepo: true,
            liveDemo: true,
            courseId: webDevCourse.id,
        },
        {
            title: "JavaScript Calculator",
            description: "Build a calculator using vanilla JavaScript",
            instructions: `
# JavaScript Calculator

Build a functional calculator using HTML, CSS, and JavaScript.

## Requirements:
- Basic operations: +, -, *, /
- Clear and delete functionality
- Keyboard support
- Display shows current calculation
- Handle edge cases (division by zero, etc.)

## Submission:
- Submit your GitHub repository URL
- Deploy and include the live demo URL
            `.trim(),
            dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 3 weeks from now
            maxPoints: 100,
            type: "PROJECT",
            githubRepo: true,
            liveDemo: true,
            courseId: webDevCourse.id,
        },
        {
            title: "React Todo App",
            description: "Create a todo list application using React",
            instructions: `
# React Todo Application

Build a feature-rich todo list application with React.

## Requirements:
- Add, edit, and delete todos
- Mark todos as complete
- Filter by status (all, active, completed)
- Persist data to localStorage
- Use React hooks
- Style with CSS or a CSS framework

## Submission:
- Submit your GitHub repository URL
- Deploy to Vercel/Netlify and include live URL
            `.trim(),
            dueDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000), // 4 weeks from now
            maxPoints: 150,
            type: "PROJECT",
            githubRepo: true,
            liveDemo: true,
            courseId: webDevCourse.id,
        },
        {
            title: "Full Stack Blog",
            description: "Build a full-stack blog with authentication",
            instructions: `
# Full Stack Blog Application

Create a complete blog application with frontend and backend.

## Requirements:
### Frontend:
- React with routing
- List all blog posts
- View individual posts
- Create/edit posts (authenticated users)
- User authentication UI

### Backend:
- Node.js with Express
- RESTful API
- Database (MongoDB or PostgreSQL)
- JWT authentication
- CRUD operations for posts

## Submission:
- Submit frontend and backend GitHub repository URLs
- Deploy both and include live URLs
- Include README with setup instructions
            `.trim(),
            dueDate: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000), // 6 weeks from now
            maxPoints: 200,
            type: "CAPSTONE",
            githubRepo: true,
            liveDemo: true,
            courseId: webDevCourse.id,
        },
    ];

    for (const assignment of assignments) {
        await prisma.assignment.create({
            data: assignment,
        });
        console.log(`✓ Created assignment: ${assignment.title}`);
    }

    console.log("\n✅ Database seeded successfully!");
}

main()
    .catch((e) => {
        console.error("Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
