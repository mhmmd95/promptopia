import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest, {params}: any) => {
    try {

        await connectToDB();

        console.log(params);
        const prompts = await Prompt.find({creator: params.id}).populate('creator');

        return new Response(JSON.stringify(prompts), {status: 200});

    } catch (error) {
        console.log(error);
        return new Response("Failed to get the list of prompts", {status: 500});
    }
}