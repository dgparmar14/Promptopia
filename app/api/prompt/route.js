import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
    try {
        await connectToDB();
        
        // Use the `await` keyword to await the query and populate operations
        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
};
