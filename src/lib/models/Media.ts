import mongoose, { Schema, Model } from "mongoose";

export interface IMediaDocument extends mongoose.Document {
    url: string;
    type: "image" | "video";
    category: string;
    caption: string;
    eventRef?: mongoose.Types.ObjectId;
    order: number;
    createdAt: Date;
}

const MediaSchema = new Schema<IMediaDocument>(
    {
        url: {
            type: String,
            required: [true, "URL is required"],
        },
        type: {
            type: String,
            enum: ["image", "video"],
            required: [true, "Type is required"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
        },
        caption: {
            type: String,
            trim: true,
            default: "",
        },
        eventRef: {
            type: Schema.Types.ObjectId,
            ref: "Event",
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

// Indexes
MediaSchema.index({ category: 1, order: 1 });
MediaSchema.index({ eventRef: 1 });
MediaSchema.index({ type: 1 });

const Media: Model<IMediaDocument> =
    mongoose.models.Media || mongoose.model<IMediaDocument>("Media", MediaSchema);

export default Media;
