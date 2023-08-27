import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const {userId, prompt, tag} = await req.json();

    try {
        await connectToDB();//lambda function(serverless function)//it dies after doing its job.

        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
        });

        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt), {status: 201});
    } catch (error) {
        console.log(error);
        return new Response("Failed to create new prompt", {status: 500});
    }
}