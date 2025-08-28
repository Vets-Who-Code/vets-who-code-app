import teamMembers from "@data/team-members.json";
import boardMembers from "@data/board-members.json";

export function getTeamMemberBySlug(slug: string) {
    const allMembers = [...teamMembers, ...boardMembers];
    return allMembers.find((member) => member.slug === slug);
}

export function getAllTeamMembers() {
    return {
        teamMembers,
        boardMembers,
    };
}
