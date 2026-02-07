import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.progress.deleteMany();
    await prisma.bookmark.deleteMany();
    await prisma.note.deleteMany();
    await prisma.submission.deleteMany();
    await prisma.assignment.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.module.deleteMany();
    await prisma.certificate.deleteMany();
    await prisma.enrollment.deleteMany();
    await prisma.course.deleteMany();
    const cohort = await prisma.cohort.create({
        data: {
            name: "Class #13",
            description: "Elite cohort for advanced veterans transitioning to tech careers",
            startDate: new Date("2025-01-15"),
            endDate: new Date("2025-07-15"),
            isElite: true,
        },
    });
    const _adminUser = await prisma.user.upsert({
        where: { email: "admin@vetswhocode.io" },
        update: {
            role: "ADMIN",
            cohortId: cohort.id,
        },
        create: {
            email: "admin@vetswhocode.io",
            name: "Admin User",
            role: "ADMIN",
            cohortId: cohort.id,
            bio: "VetsWhoCode platform administrator",
        },
    });

    const _instructorUser = await prisma.user.upsert({
        where: { email: "instructor@vetswhocode.io" },
        update: {
            role: "INSTRUCTOR",
            cohortId: cohort.id,
        },
        create: {
            email: "instructor@vetswhocode.io",
            name: "Instructor User",
            role: "INSTRUCTOR",
            cohortId: cohort.id,
            bio: "Senior instructor teaching web development",
        },
    });

    const studentUser = await prisma.user.upsert({
        where: { email: "student@vetswhocode.io" },
        update: {
            role: "STUDENT",
            cohortId: cohort.id,
        },
        create: {
            email: "student@vetswhocode.io",
            name: "Student User",
            role: "STUDENT",
            cohortId: cohort.id,
            bio: "Army veteran learning full-stack web development",
            branch: "Army",
            rank: "Sergeant",
            yearsServed: 6,
            skillLevel: "BEGINNER",
        },
    });
    const webDevCourse = await prisma.course.create({
        data: {
            title: "Web Development Fundamentals",
            description:
                "Complete web development course covering HTML, CSS, JavaScript, React, and Node.js. Perfect for veterans transitioning to tech careers.",
            category: "Web Development",
            difficulty: "BEGINNER",
            estimatedHours: 120,
            prerequisites: [],
            tags: ["html", "css", "javascript", "react", "nodejs", "fullstack"],
            isPublished: true,
            imageUrl: "/images/courses/web-dev.jpg",
        },
    });

    // MODULE 1: HTML Fundamentals
    const htmlModule = await prisma.module.create({
        data: {
            title: "HTML Fundamentals",
            description: "Learn the building blocks of web pages with HTML",
            order: 1,
            courseId: webDevCourse.id,
            lessons: {
                create: [
                    {
                        title: "Introduction to HTML",
                        content:
                            "# Introduction to HTML\n\nHTML (HyperText Markup Language) is the standard markup language for creating web pages. In this lesson, you will learn the basics of HTML structure and syntax.",
                        type: "CONTENT",
                        order: 1,
                        duration: 30,
                    },
                    {
                        title: "HTML Elements and Tags",
                        content:
                            "# HTML Elements\n\nLearn about common HTML elements including headings, paragraphs, links, and images. Practice using semantic HTML for better accessibility.",
                        type: "CONTENT",
                        order: 2,
                        duration: 45,
                    },
                    {
                        title: "HTML Forms",
                        content:
                            "# HTML Forms\n\nForms are essential for user interaction. Learn how to create forms with inputs, buttons, and validation.",
                        videoUrl: "https://www.youtube.com/watch?v=fNcJuPIZ2WE",
                        type: "VIDEO",
                        order: 3,
                        duration: 60,
                    },
                    {
                        title: "HTML Practice Exercise",
                        content:
                            "# Exercise: Build Your First HTML Page\n\nCreate a personal profile page using semantic HTML elements. Include:\n- Header with your name\n- Navigation menu\n- About section\n- Contact form",
                        type: "EXERCISE",
                        order: 4,
                        duration: 90,
                    },
                ],
            },
        },
    });

    // MODULE 2: CSS Fundamentals
    const _cssModule = await prisma.module.create({
        data: {
            title: "CSS Fundamentals",
            description: "Style your web pages with modern CSS techniques",
            order: 2,
            courseId: webDevCourse.id,
            lessons: {
                create: [
                    {
                        title: "Introduction to CSS",
                        content:
                            "# CSS Basics\n\nCSS (Cascading Style Sheets) controls the visual presentation of HTML. Learn selectors, properties, and values.",
                        type: "CONTENT",
                        order: 1,
                        duration: 30,
                    },
                    {
                        title: "CSS Box Model",
                        content:
                            "# The Box Model\n\nUnderstanding margin, padding, border, and content is crucial for layout. Master the CSS box model.",
                        type: "VIDEO",
                        videoUrl: "https://www.youtube.com/watch?v=rIO5326FgPE",
                        order: 2,
                        duration: 45,
                    },
                    {
                        title: "CSS Flexbox",
                        content:
                            "# Flexbox Layout\n\nFlexbox is a powerful layout system for creating responsive designs. Learn how to align and distribute items.",
                        type: "CONTENT",
                        order: 3,
                        duration: 60,
                    },
                    {
                        title: "CSS Grid",
                        content:
                            "# CSS Grid Layout\n\nCSS Grid enables complex two-dimensional layouts. Master grid for professional designs.",
                        type: "VIDEO",
                        videoUrl: "https://www.youtube.com/watch?v=EFafSYg-PkI",
                        order: 4,
                        duration: 60,
                    },
                    {
                        title: "CSS Styling Project",
                        content:
                            "# Project: Style Your Profile Page\n\nApply CSS to the HTML page you created. Use Flexbox or Grid for layout.",
                        type: "PROJECT",
                        order: 5,
                        duration: 120,
                    },
                ],
            },
        },
    });

    // MODULE 3: JavaScript Basics
    const _jsModule = await prisma.module.create({
        data: {
            title: "JavaScript Basics",
            description: "Add interactivity to your web pages with JavaScript",
            order: 3,
            courseId: webDevCourse.id,
            lessons: {
                create: [
                    {
                        title: "JavaScript Introduction",
                        content:
                            "# Getting Started with JavaScript\n\nJavaScript brings your web pages to life. Learn variables, data types, and basic syntax.",
                        type: "CONTENT",
                        order: 1,
                        duration: 45,
                    },
                    {
                        title: "Functions and Scope",
                        content:
                            "# JavaScript Functions\n\nFunctions are reusable blocks of code. Understand function declaration, parameters, and scope.",
                        type: "CONTENT",
                        order: 2,
                        duration: 60,
                    },
                    {
                        title: "DOM Manipulation",
                        content:
                            "# Working with the DOM\n\nThe Document Object Model (DOM) allows JavaScript to interact with HTML. Learn to select and modify elements.",
                        type: "VIDEO",
                        videoUrl: "https://www.youtube.com/watch?v=y17RuWkWdn8",
                        order: 3,
                        duration: 75,
                    },
                    {
                        title: "Events and Event Handlers",
                        content:
                            "# JavaScript Events\n\nRespond to user actions like clicks, hovers, and form submissions with event handlers.",
                        type: "CONTENT",
                        order: 4,
                        duration: 60,
                    },
                    {
                        title: "Interactive Todo App",
                        content:
                            "# Project: Build a Todo App\n\nCreate an interactive todo application using vanilla JavaScript. Add, remove, and mark items complete.",
                        type: "PROJECT",
                        order: 5,
                        duration: 150,
                    },
                ],
            },
        },
    });

    // MODULE 4: React Fundamentals
    const _reactModule = await prisma.module.create({
        data: {
            title: "React Fundamentals",
            description: "Build modern user interfaces with React",
            order: 4,
            courseId: webDevCourse.id,
            lessons: {
                create: [
                    {
                        title: "Introduction to React",
                        content:
                            "# What is React?\n\nReact is a JavaScript library for building user interfaces. Learn about components and the virtual DOM.",
                        type: "CONTENT",
                        order: 1,
                        duration: 45,
                    },
                    {
                        title: "React Components and Props",
                        content:
                            "# Components and Props\n\nComponents are the building blocks of React apps. Learn to create and compose components.",
                        type: "VIDEO",
                        videoUrl: "https://www.youtube.com/watch?v=Tn6-PIqc4UM",
                        order: 2,
                        duration: 60,
                    },
                    {
                        title: "State and Hooks",
                        content:
                            "# React State Management\n\nState allows components to be dynamic. Master useState and other React hooks.",
                        type: "CONTENT",
                        order: 3,
                        duration: 90,
                    },
                    {
                        title: "React Router",
                        content:
                            "# Navigation with React Router\n\nCreate multi-page applications with React Router. Learn routing and navigation.",
                        type: "CONTENT",
                        order: 4,
                        duration: 60,
                    },
                ],
            },
        },
    });

    // MODULE 5: Node.js and APIs
    const _nodeModule = await prisma.module.create({
        data: {
            title: "Node.js and Backend Development",
            description: "Build server-side applications with Node.js",
            order: 5,
            courseId: webDevCourse.id,
            lessons: {
                create: [
                    {
                        title: "Introduction to Node.js",
                        content:
                            "# Node.js Basics\n\nNode.js allows JavaScript to run on the server. Learn about modules, npm, and the Node ecosystem.",
                        type: "CONTENT",
                        order: 1,
                        duration: 45,
                    },
                    {
                        title: "Express.js Framework",
                        content:
                            "# Building APIs with Express\n\nExpress is a minimal web framework for Node.js. Create RESTful APIs.",
                        type: "VIDEO",
                        videoUrl: "https://www.youtube.com/watch?v=L72fhGm1tfE",
                        order: 2,
                        duration: 90,
                    },
                    {
                        title: "Databases and ORMs",
                        content:
                            "# Working with Databases\n\nConnect to databases using ORMs like Prisma. Perform CRUD operations.",
                        type: "CONTENT",
                        order: 3,
                        duration: 75,
                    },
                ],
            },
        },
    });
    const assignments = await Promise.all([
        prisma.assignment.create({
            data: {
                title: "HTML Portfolio Page",
                description: "Create a personal portfolio page using semantic HTML",
                instructions:
                    "Build a complete portfolio page that includes:\n- Semantic HTML structure\n- Header with navigation\n- About section\n- Projects section\n- Contact form\n\nUse proper HTML5 semantic elements.",
                courseId: webDevCourse.id,
                dueDate: new Date("2025-02-01"),
                maxPoints: 100,
                type: "PROJECT",
            },
        }),
        prisma.assignment.create({
            data: {
                title: "CSS Styled Calculator",
                description: "Build a calculator UI using CSS Grid/Flexbox",
                instructions:
                    "Create a fully styled calculator interface:\n- Use CSS Grid or Flexbox\n- Responsive design\n- Modern styling with hover effects\n- Clean, professional appearance",
                courseId: webDevCourse.id,
                dueDate: new Date("2025-03-01"),
                maxPoints: 100,
                type: "PROJECT",
            },
        }),
        prisma.assignment.create({
            data: {
                title: "JavaScript Todo App",
                description: "Create an interactive todo application",
                instructions:
                    "Build a functional todo app with:\n- Add new todos\n- Mark todos as complete\n- Delete todos\n- Filter todos (all, active, completed)\n- Use local storage for persistence",
                courseId: webDevCourse.id,
                dueDate: new Date("2025-04-01"),
                maxPoints: 150,
                type: "PROJECT",
                githubRepo: true,
            },
        }),
        prisma.assignment.create({
            data: {
                title: "Full Stack Blog Application",
                description: "Build a blog with React frontend and Node.js backend",
                instructions:
                    "Create a full-stack blog application:\n- React frontend with routing\n- Node.js/Express backend\n- Database integration\n- CRUD operations for posts\n- User authentication\n- Deploy to a hosting platform",
                courseId: webDevCourse.id,
                dueDate: new Date("2025-06-01"),
                maxPoints: 200,
                type: "CAPSTONE",
                githubRepo: true,
                liveDemo: true,
            },
        }),
    ]);
    const _enrollment = await prisma.enrollment.create({
        data: {
            userId: studentUser.id,
            courseId: webDevCourse.id,
            status: "ACTIVE",
            progress: 15.5,
        },
    });
    const htmlLessons = await prisma.lesson.findMany({
        where: { moduleId: htmlModule.id },
        orderBy: { order: "asc" },
    });

    // Mark first 2 HTML lessons as completed
    for (let i = 0; i < 2; i++) {
        await prisma.progress.create({
            data: {
                userId: studentUser.id,
                lessonId: htmlLessons[i].id,
                completed: true,
                completedAt: new Date(),
                timeSpent: htmlLessons[i].duration || 30,
            },
        });
    }
    await prisma.bookmark.create({
        data: {
            userId: studentUser.id,
            lessonId: htmlLessons[2].id,
        },
    });
    await prisma.note.create({
        data: {
            userId: studentUser.id,
            lessonId: htmlLessons[1].id,
            content:
                "Remember: Always use semantic HTML for better accessibility and SEO. The <header>, <nav>, <main>, and <footer> elements are your friends!",
        },
    });
    await prisma.submission.create({
        data: {
            userId: studentUser.id,
            assignmentId: assignments[0].id,
            githubUrl: "https://github.com/student/portfolio",
            notes: "Completed my first HTML portfolio! Learned a lot about semantic HTML.",
            status: "SUBMITTED",
            submittedAt: new Date(),
        },
    });
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
