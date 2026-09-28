---
title: "High Success, Low Adoption: The Advice Everyone Asks For and Nobody Follows"
postedAt: "2026-09-27T10:00:00.000Z"
author: "Jerome Hardaway"
description: "One piece of advice has worked for over a decade of veterans and career-switchers breaking into software engineering: build something real, maintain it, and put it in front of users. Here's why builders win and why so few people do it."
image:
  src: "blog-images/high-success-low-adoption.png"
  alt: "A builder bolting a steel bridge across a gap, a city skyline rising behind"
category: "Career Advice"
tags:
  - Career Advice
  - Building in Public
  - Software Engineering
  - AI
  - Hiring
  - Veterans
is_featured: true
---

For over a decade, I've helped veterans and career-switchers break into software engineering. In that time, one piece of advice has worked almost every time. Only a small fraction of the people who ask for it actually follow it.

**Build.**

I don't mean three toy apps or a JavaScript calculator. I mean something substantial: a real product people can visit, use, and break.

Most juniors would rather polish their resume for the tenth time or grind another LeetCode problem. Those things feel productive. But if you're competing against fresh CS grads and a pile of cookie-cutter portfolios, the only thing that separates you is something that lives in the wild.

## Builders Win

Look at the people who shaped the modern web.

Ken Wheeler didn't have a CS degree. He built Slick Slider, and that opened the door. Brian Holt rebuilt redditgifts in React over a weekend and shipped it to production. (Don't do that. Brian really did push straight to prod in his twenties. Now we're the seniors writing the two-approval PR policies so nobody else can.)

My own career follows the same pattern. Nearly every job and contract I've landed came from building Vets Who Code. The stack I used at VWC kept pace with what the industry demanded, so my work spoke for itself. Companies still hire me to write code, but what gets me through the door now is the player-coach reputation I earned by building VWC in public, teaching others on a real codebase as I went. The build came first. Everything else followed from it.

## "I Don't Know What to Build" Is the Wrong Question

What you build matters less than whether you'll maintain it.

For the better part of a decade, I've built, maintained, and re-architected the Vets Who Code open-source site. It was never a static brochure. It was a living codebase where I learned new paradigms and taught troops how production software actually works.

That one project has moved through nearly every era of modern web development:

1. A one-page Bootstrap site backed by MySQL
2. Gatsby, for static site generation
3. Create React App, as React matured
4. Next.js, where it lives today

![One site, four eras: the Vets Who Code site moved from Bootstrap and MySQL to Gatsby, then Create React App, then Next.js with Gemini running security and content workflows.](blog-graphics/high-success-low-adoption-site-eras)

And it's still evolving. The site now runs Google Gemini to handle parts of its security and automate content workflows, like generating audio and images for the blog.

Weekend projects won't teach you migration pain, hydration bugs, or state management at scale. Keeping a legacy system alive will, especially when you have to explain every decision to the juniors you're mentoring.

## Real Users Create Real Problems

Building the VWC Learning Management System, separate from the marketing site, taught me more about web applications than any course could.

Real users do things tutorials never anticipate. One troop with ADHD would leave a tab open all day while away from the desk. That idle tab was burning around $20 in server costs for zero usage. Fixing it forced me deep into aggressive caching and session management.

You don't learn optimization in theory. You learn it when real dollars and real compute are on the line.

## AI Skills Are the New NPM Packages

Building a real platform also cuts through AI hype. I've learned more about AI from hitting its limits in my own project than from anything else.

While people panic about AI eating syntax, I've been focused on architecture. My troops and I took command-line tasks that used to need bulky NPM packages and rebuilt them as AI "skills." Along the way we worked out how to make a skill run reliably every time and how to chain skills together. That work led me to one conclusion: **AI skills are the new NPM packages.** If you aren't building them, you're just a consumer.

We also built a large Retrieval-Augmented Generation (RAG) pipeline. We ingested roughly $20,000 worth of technical books we'd purchased over the years into an internal-only knowledge base. Then we gave our AI assistant strict guardrails. When a troop asks a question, it doesn't hand over the answer. It mentors instead, guiding them toward the solution and pointing to the exact spot in the curriculum.

Prompt engineering to context engineering, LLM evaluations, prompt caching for a RAG state machine on PostgreSQL: you only learn those by building the system.

## Building Is Networking

People say they can't network and can't beat the Applicant Tracking System. They're fighting the wrong battle.

Many hiring pipelines now pull your GitHub and LinkedIn to score you before a human ever opens your resume. First-round screens are increasingly run by AI over phone or text. By the time a person looks at you, the machine has already decided whether you're worth their time. A resume can claim anything. A commit history can't fake years of shipping.

I tested this myself. In my 60-day job hunt, I sent 79 applications and came away with four wins: two full-time offers and two contracts. None of them came from cold applications alone. The offers came through recruiters who reached out to me, and the contracts came through my network. Cold applications convert at a fraction of a percent. Referrals convert around 30%. My recruiter conversations closed at about 40%.

![79 applications, 4 wins: two full-time offers via inbound recruiters, two contracts via network, zero from cold applications alone. Cold applications convert under 1%, referrals about 30%, recruiter conversations about 40%.](blog-graphics/high-success-low-adoption-job-hunt)

That inbound didn't come from networking events. It came from years of building in public. When recruiters and hiring managers can see what you've shipped, they come to you with a role, a budget, and urgency already in hand.

Building also wins the rounds that matter most. **If it's on your resume, you'd better be able to defend every line.** Builders can, because they lived every decision. They know why they chose that database, where the system broke, and what they'd do differently.

Today's hiring managers also look for different artifacts. A to-do app doesn't cut it. They want spec work, test harnesses, LLM evals, and the "why" written into your issues and pull requests. That paper trail shows how you think, and it only exists if you're building something real.

A live product changes how you network. You stop asking for favors. You start having real conversations about the problems you're solving, the infrastructure you're running, and the impact you're making.

## It's Never Been a Better Time to Be a Builder

Everyone is worried about AI taking jobs. I see the opposite. AI isn't shrinking the builder's market. It's handing builders the keys.

A decade ago, shipping a real product meant weeks of boilerplate, pricey hosting, and a team you didn't have. Today one person can stand up a full-stack app, deploy it for free, and wire in AI that handles security, content, and mentoring. That's what we did on the VWC site. The tools that scare people who wait are the same tools that let builders move faster than ever.

That's also why the gap is getting wider. The people polishing resumes and grinding challenges are competing on the same page as everyone else. The people shipping are playing a different game. They have the artifacts, the inbound, and the answers in the final round.

Builders have always won. They land the jobs, get the contracts, and bounce back first when the market turns. What's changed is that the barrier to becoming one has never been lower.

Find a problem that matters to you. Build the solution. Maintain it. Put it in front of real users.

That's the whole secret. The hard part is doing it.
