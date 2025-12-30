import mongoose, { Schema, Model } from "mongoose";

export interface IUserDocument extends mongoose.Document {
    email: string;
    password: string;
    name: string;
    role: "admin" | "editor";
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 8,
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        role: {
            type: String,
            enum: ["admin", "editor"],
            default: "editor",
        },
    },
    {
        timestamps: true,
    }
);

// Index for efficient querying
UserSchema.index({ email: 1 });

const User: Model<IUserDocument> =
    mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);

export default User;
