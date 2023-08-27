import mongoose, { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,   //a document in the database(user)
        ref: 'User', //one to many => a user can create many prompts
    },

    prompt: {
        type: String,
        required: [true, 'Prompt is required!!'],
    },

    tag: {
        type: String,
        required: [true, 'tag is required!!'],
    },
})

/*nextJs routes are serverless, means that the connection is not permanent, 
then check of the model already exists then use it, else create it
*/
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;