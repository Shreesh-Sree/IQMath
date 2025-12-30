import mongoose, { Schema, Model } from "mongoose";

export interface IEventDocument extends mongoose.Document {
    title: string;
    slug: string;
    description: string;
    date: Date;
    endDate?: Date;
    location: string;
    type: "workshop" | "seminar" | "training" | "webinar";
    status: "upcoming" | "ongoing" | "completed";
    gallery: string[];
    isVisible: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const EventSchema = new Schema<IEventDocument>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        slug: {
            type: String,
            required: [true, "Slug is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        date: {
            type: Date,
            required: [true, "Date is required"],
        },
        endDate: {
            type: Date,
        },
        location: {
            type: String,
            required: [true, "Location is required"],
        },
        type: {
            type: String,
            enum: ["workshop", "seminar", "training", "webinar"],
            required: [true, "Type is required"],
        },
        status: {
            type: String,
            enum: ["upcoming", "ongoing", "completed"],
            default: "upcoming",
        },
        gallery: {
            type: [String],
            default: [],
        },
        isVisible: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
EventSchema.index({ slug: 1 });
EventSchema.index({ status: 1, date: -1 });
EventSchema.index({ isVisible: 1, status: 1 });

const Event: Model<IEventDocument> =
    mongoose.models.Event || mongoose.model<IEventDocument>("Event", EventSchema);

export default Event;
