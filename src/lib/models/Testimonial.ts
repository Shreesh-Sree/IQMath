import mongoose, { Schema, Model } from "mongoose";

export interface ITestimonialDocument extends mongoose.Document {
    name: string;
    role: string;
    organization: string;
    type: "student" | "institution" | "corporate";
    content: string;
    image?: string;
    isVisible: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonialDocument>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        role: {
            type: String,
            required: [true, "Role is required"],
            trim: true,
        },
        organization: {
            type: String,
            required: [true, "Organization is required"],
            trim: true,
        },
        type: {
            type: String,
            enum: ["student", "institution", "corporate"],
            required: [true, "Type is required"],
        },
        content: {
            type: String,
            required: [true, "Content is required"],
            maxlength: 500,
        },
        image: {
            type: String,
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
TestimonialSchema.index({ type: 1, isVisible: 1 });
TestimonialSchema.index({ createdAt: -1 });

const Testimonial: Model<ITestimonialDocument> =
    mongoose.models.Testimonial ||
    mongoose.model<ITestimonialDocument>("Testimonial", TestimonialSchema);

export default Testimonial;
