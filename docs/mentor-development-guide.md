# Mentor development guide (internal process)

The public half of the mentor standards and development guide lives at
[`/programs/mentorship/standards`](../src/pages/programs/mentorship/standards.tsx), with its data in
[`src/data/mentor-standards.ts`](../src/data/mentor-standards.ts). It covers the five standards, the
four growth stages and the support VWC provides. This doc covers the process that runs behind it.

Source: issue #1435 and its owner decisions (2026-09-26).

## What stays internal

These are never published and never committed to this repo:

- completed self-assessments
- reviewer notes
- mentee survey responses

This doc describes the process and the blank template only. Keep filled-in copies in VWC's internal
tools, outside this public repository.

Don't call any of this a "rubric." It's the mentor standards and development guide. The name should
signal support, not surveillance. The troop unit rubric referenced on `/programs/mentorship` is a
separate thing.

## Growth stages

Learning → Practicing → Proficient → Coaching Others. Stages replace 1–4 scores. Mentors at Coaching
Others become peer leads for new mentors.

Conduct isn't a stage. It's pass or fail (see below).

## Self-assessment

1. **When:** at kickoff, and again mid-accelerator.
2. **Who fills it in:** the mentor, about themselves.
3. **Who reviews it:** staff now. Once there are mentors at Coaching Others, they take over the
   review as peer leads.
4. **How the review runs:** staff review it *with* the mentor, not *on* them. For every standard
   where the mentor isn't yet Proficient, point them to the support item for that standard.

### Blank template

Copy this into the internal tool. Don't commit a filled-in copy.

| Standard                | Stage (Learning / Practicing / Proficient / Coaching Others) |
| ----------------------- | ------------------------------------------------------------ |
| Cadence                 |                                                              |
| Evidence-Based Feedback |                                                              |
| Gradual Release         |                                                              |
| Market Anchoring        |                                                              |
| Conduct                 | Pass / Fail                                                  |

The stage descriptions to rate against are on the public page.

## Mentee survey

- Five questions, one per standard.
- Runs at weeks 8–9 and at week 17.
- Feedback goes to the mentor directly, framed as input for growth, not a verdict.
- **Relay themes, not raw responses.** Pairings are one-on-one, so anonymity is weak. The reviewer
  summarizes themes for the mentor so mentees can be honest.

The five questions haven't been written yet (see follow-ups).

## Conduct: the one hard line

Conduct covers confidentiality, no soliciting, and data handling. It protects veterans, so it can't
be "developing." A mentor who breaches it rotates off, whatever their growth stage.

Support for conduct is up-front: onboarding on confidentiality and AI-tool data rules.

## Support resources

Each standard maps to the support VWC provides when a mentor is struggling. None of these resources
exists yet, so the public page names them without links.

| Standard                | Support                                                                  | Status    |
| ----------------------- | ------------------------------------------------------------------------ | --------- |
| Cadence                 | Session templates and an async check-in format                           | To create |
| Evidence-Based Feedback | Sample PR reviews and a guide to reviewing an agent session log          | To create |
| Gradual Release         | A short playbook on when to step back and let the troop drive the agent  | To create |
| Market Anchoring        | Current job-posting pulls and mock interview scripts                     | To create |
| Conduct                 | Onboarding on confidentiality and AI-tool data rules                     | To create |

## Follow-ups

- Owner refines and approves the draft matrix (about 2 hours, per #1435).
- Write the five mentee survey questions, one per standard.
- Create each support resource above, then link it from `src/data/mentor-standards.ts`.
- Decide which accelerator week counts as "mid-accelerator" for the second self-assessment.
