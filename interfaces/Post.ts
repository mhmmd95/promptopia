import mongoose from 'mongoose';

export type Post = {
    creator: mongoose.Schema.Types.ObjectId,
    prompt: string,
    tag: string,
}