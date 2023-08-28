import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { connect } from "mongoose";
import { NextRequest } from "next/server";

//get prompt based on id
export const GET = async (request: NextRequest, {params}: any) => {
    try {

        await connectToDB();
        console.error({params});
        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt) {
            return new Response("prompt not found", {status: 404});
        }
        return new Response(JSON.stringify(prompt), {status: 200});

    } catch (error) {
        console.log(error);
        return new Response("Failed to get the list of prompts", {status: 500});
    }
}

//patch prompt based on id
export const PATCH = async (request: NextRequest, {params}: any) => {
    try {

        await connectToDB();        

        const {prompt, tag} = await request.json();

        const existedPrompt = await Prompt.findById(params.id);
        if(!existedPrompt) {
            return new Response("prompt not found", {status: 404});
        }

        existedPrompt.prompt = prompt;
        existedPrompt.tag = tag;
        await existedPrompt.save();

        return new Response(JSON.stringify(existedPrompt), {status: 200});

    } catch (error) {
        console.log(error);
        return new Response("Failed to update the prompt", {status: 500});
    }
}

//delete prompt based on id
export const DELETE = async (request: NextRequest, {params}: any) => {
    try {

        await connectToDB()

        const existedPrompt = await Prompt.findByIdAndRemove(params.id);
        if(!existedPrompt) {
            return new Response("prompt not found", {status: 404});
        }
    } catch (error) {
        console.log(error);
        return new Response("Failed to delete the prompt", {status: 500});
    }
}
