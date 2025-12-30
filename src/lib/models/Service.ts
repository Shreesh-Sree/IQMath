import mongoose, { Schema, Model } from "mongoose";

export interface IServiceDocument extends mongoose.Document {
    title: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    category: "training" | "consulting" | "development";
    outcomes: string[];
    targetAudience: string[];
    duration?: string;
    isVisible: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const ServiceSchema = new Schema<IServiceDocument>(
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
        shortDescription: {
            type: String,
            required: [true, "Short description is required"],
            maxlength: 300,
        },
        fullDescription: {
            type: String,
            required: [true, "Full description is required"],
        },
        category: {
            type: String,
            enum: ["training", "consulting", "development"],
            required: [true, "Category is required"],
        },
        outcomes: {
            type: [String],
            default: [],
        },
        targetAudience: {
            type: [String],
            default: [],
        },
        duration: {
            type: String,
        },
        isVisible: {
            type: Boolean,
            default: true,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
ServiceSchema.index({ slug: 1 });
ServiceSchema.index({ category: 1, isVisible: 1 });
ServiceSchema.index({ order: 1 });

const Service: Model<IServiceDocument> =
    mongoose.models.Service ||
    mongoose.model<IServiceDocument>("Service", ServiceSchema);

export default Service;
