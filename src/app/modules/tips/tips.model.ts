import { model, Schema } from "mongoose";
import { TipsModel, ITips } from "./tips.interface";

const tipsSchema = new Schema<ITips, TipsModel>(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

export const Tips = model<ITips, TipsModel>("Tips", tipsSchema);