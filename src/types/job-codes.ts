export type BranchKey = "army" | "navy" | "air_force" | "marine_corps" | "coast_guard";

export interface JobCodeEntry {
	code: string;
	branch: BranchKey;
}
