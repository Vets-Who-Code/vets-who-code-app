import { tool } from "ai";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { branch, personnelcategory } from "@prisma/client";

export const mosLookup = tool({
    description:
        "Lookup a Military Occupational Specialty (MOS) or Air Force Specialty (AFSC) code to get its description and related information. This tool should be used if the user enters the /mos or /afsc command which will be followed by the MOS or AFSC code. The tool will return information about the MOS or AFSC code. If an afsc code is given the code sent to the tool should replace the 4th digit with an X if it is not an X already, for example 1A113 should be changed to 1A1X3. The data returned should be transformed into a user friendly format which includes skills that are transferrable to a career in tech. If the tool returns an error, the AI should respond with a relevant message to the user. If no or multiple results are found the AI should prompt the user for further information to clarify so the response can be narrowed to one result.",
    parameters: z.object({
        code: z.string().describe("The MOS or AFSC code to look up, e.g., '11B' for Infantryman."),
        mos_branch: z.nativeEnum(branch).optional(),
        mos_personnel_category: z.nativeEnum(personnelcategory).optional(),
    }),
    execute: async ({ code, mos_branch, mos_personnel_category }) => {
        const res = await prisma.military_occupation.findMany({
            where: {
                code: {
                    equals: code,
                    mode: "insensitive",
                },
                branch: {
                    equals: mos_branch,
                },
                personnel_category: {
                    equals: mos_personnel_category,
                },
            },
        });
        return res;
    },
});

export default mosLookup;
