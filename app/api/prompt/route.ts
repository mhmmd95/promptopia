import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async () => {
    try {

        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), {status: 200});

    } catch (error) {
        console.log(error);
        return new Response("Failed to get the list of prompts", {status: 500});
    }
}