import mongoose, { Schema, Model } from "mongoose";

export interface IAppointmentDocument extends mongoose.Document {
    name: string;
    email: string;
    phone: string;
    purpose: "student" | "college" | "corporate";
    message: string;
    preferredTime: Date;
    status: "pending" | "approved" | "rejected" | "completed";
    adminNotes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointmentDocument>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: [true, "Phone is required"],
            trim: true,
        },
        purpose: {
            type: String,
            enum: ["student", "college", "corporate"],
            required: [true, "Purpose is required"],
        },
        message: {
            type: String,
            required: [true, "Message is required"],
        },
        preferredTime: {
            type: Date,
            required: [true, "Preferred time is required"],
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected", "completed"],
            default: "pending",
        },
        adminNotes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
AppointmentSchema.index({ status: 1, createdAt: -1 });
AppointmentSchema.index({ email: 1 });
AppointmentSchema.index({ preferredTime: 1 });

const Appointment: Model<IAppointmentDocument> =
    mongoose.models.Appointment ||
    mongoose.model<IAppointmentDocument>("Appointment", AppointmentSchema);

export default Appointment;
