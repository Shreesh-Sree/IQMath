import mongoose, { Schema, Model } from "mongoose";

export interface ITeamMemberDocument extends mongoose.Document {
    name: string;
    role: string;
    bio: string;
    skills: string[];
    achievements: string[];
    linkedin?: string;
    image?: string;
    order: number;
    isVisible: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMemberDocument>(
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
        bio: {
            type: String,
            required: [true, "Bio is required"],
        },
        skills: {
            type: [String],
            default: [],
        },
        achievements: {
            type: [String],
            default: [],
        },
        linkedin: {
            type: String,
            trim: true,
        },
        image: {
            type: String,
        },
        order: {
            type: Number,
            default: 0,
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
TeamMemberSchema.index({ order: 1 });
TeamMemberSchema.index({ isVisible: 1, order: 1 });

const TeamMember: Model<ITeamMemberDocument> =
    mongoose.models.TeamMember ||
    mongoose.model<ITeamMemberDocument>("TeamMember", TeamMemberSchema);

export default TeamMember;
