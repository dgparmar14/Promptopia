import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// Get(read)
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        // Use the `await` keyword to await the query and populate operations
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) return new Response("Prompt not found", { status: 404 })


        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
};

// patch(update)
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();
    try {
        await connectToDB();

        const exisistingPrompt = await Prompt.findById(params.id);
        if (!exisistingPrompt) return new Response("Prompt not found", { status: 404 })

        exisistingPrompt.prompt = prompt;
        exisistingPrompt.tag = tag;

        await exisistingPrompt.save();
        return new Response(JSON.stringify(exisistingPrompt), { status: 200 });

    } catch (error) {
        return new Response("Failed to update the prompt", { status: 500 });
    }

}

// delete (delete)

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id)
        return new Response("Prompt Deleted Succesfully", { status: 200 });

    } catch (error) {
        return new Response("Failed To Delete Prompt", { status: 500 });

    }
}