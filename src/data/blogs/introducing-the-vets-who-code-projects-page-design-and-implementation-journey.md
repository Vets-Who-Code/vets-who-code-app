---
title: "Introducing the Vets Who Code Projects Page: Design and Implementation Journey"
postedAt: "2025-01-18T00:00:00.000Z"
author: "Jon Onulak"
description: "A look at how Vets Who Code built a Projects Page to showcase community initiatives, with insights into the design, development, and implementation process."
image:
    {
        src: "https://res.cloudinary.com/vetswhocode/image/upload/v1737333954/projects-screenshot_nym64x.png",
    }
category: "Development Journey"
tags:
    - Vets Who Code
    - Projects Page
    - Next.js
    - Tailwind CSS
    - GitHub API
is_featured: true
---

### Introducing the Vets Who Code Projects Page: Design and Implementation Journey

Vets Who Code continually seeks innovative ways to showcase our community's work. Recently, we launched the Projects Page, a dynamic addition to our platform that highlights the initiatives our team is working on. This blog outlines the design, development, and implementation process that brought this feature to life.

## About Me

I'm [Jon Onulak](https://www.linkedin.com/in/jononulak/), a proud member of the Vets Who Code team and an aspiring developer passionate about creating meaningful tech solutions. Working on the Projects Page allowed me to merge creativity with functionality while contributing to a platform that empowers our community.

This project leverages Next.js, Tailwind CSS, and the GitHub API to ensure the page was visually engaging, user-friendly, and responsive across devices.

## Phase 1: Designing the Projects Page

The project started with three core objectives:

1. **Create a visually appealing layout** aligned with the Vets Who Code branding.
2. **Ensure seamless navigation** for users exploring our projects.
3. **Incorporate responsive design principles** for accessibility across devices.

The Figma wireframes included a grid-based display for project thumbnails, each accompanied by a title and description. Clicking on a project opens a detailed modal with comprehensive information about the initiative.

![Projects Page Wireframe](https://a.okmd.dev/md/674fbb9821bb0.png)

![Project Details Wireframe](https://a.okmd.dev/md/674fbbb71dc8d.png)

## Phase 2: Code Refactoring for Reusability

Building upon our existing Subjects Page design, I refactored the grid layout into a reusable component. This approach promotes maintainability and ensures that future updates can be implemented seamlessly across multiple pages.

The refactoring resulted in a new `VWCGrid` component, which allows for flexible layouts, and a `VWCGridCard` component to display project details dynamically.

## Phase 3: Dynamic Data Integration

To power the Projects Page, I integrated the GitHub REST API for repository information, contributor details, and user profiles. Mock data facilitated development, while robust error handling ensured the page remained functional even if API calls failed.

I implemented incremental static regeneration (ISR) using Next.js, which allows the page to update periodically without requiring a full rebuild, ensuring visitors see near-real-time information about our projects.

## Phase 4: Building the Interactive Modal

The detailed project modal was created using Radix UI's Dialog component. This feature provides an intuitive and accessible way for users to dive deeper into each project's specifics. To enhance the experience, I added animations using Motion for React. The modal now fades in with a scaling effect, creating a polished and engaging user experience.

## Phase 5: Testing and Deployment

Testing was critical to the success of this feature. Using Jest and React Testing Library, I ensured all components and functions behaved as expected. Mocking the GitHub API allowed me to simulate real-world scenarios and validate the page's performance under various conditions. With these tests complete, the Projects Page is now live and ready to showcase the amazing work of Vets Who Code.

![Projects Page Screenshot](https://res.cloudinary.com/vetswhocode/image/upload/v1737333954/projects-screenshot_nym64x.png)

## Explore the Finished Feature and Join the Conversation

The Projects Page is live and ready for you to explore! Check out the final implementation here:

- **[Live Projects Page](https://vetswhocode.io/projects)**

If you're curious about the journey behind building this feature, you can also explore the GitHub issue where this feature was discussed, designed, and iterated on. We welcome your feedback and contributions:

- **[GitHub Feature Issue](https://github.com/Vets-Who-Code/vets-who-code-app/issues/646)**

## Crafting a Memorable Ending

The Projects Page represents more than just a feature update—it's a testament to the collaborative spirit of Vets Who Code. It provides a platform to highlight the contributions of our community, inspire others, and foster engagement with our mission. I'm grateful for the opportunity to contribute to such an impactful project and look forward to seeing how it grows.

Explore the Projects Page to see the exciting initiatives we're working on, and join us in building a brighter future for Vets Who Code!

### Support Vets Who Code

If this story resonates with you, consider supporting Vets Who Code to help more veterans transition into successful tech careers. Your donations can make a significant impact. You can also sponsor us on GitHub to get technical updates and support our mission. Together, we can make a difference.
