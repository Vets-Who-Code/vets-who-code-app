import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { options } from "@/pages/api/auth/options";
import Assistant from "./assistant";

const VetsAI = async () => {
    const session = await getServerSession(options);

    if (!session) {
        redirect("/login");
    }

    return <Assistant />;
};

export default VetsAI;
