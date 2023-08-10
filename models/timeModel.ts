import mongoose from "mongoose";

const timeSchema = new mongoose.Schema({
    date: { type: String, required: true, unique: true }, // Unique document per day
    tasks: [
        {
            taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'taskmodel', required: true },
            timeWorkedToday: { type: Number, default: 0 },
        },
    ],
}, { timestamps: true })

const timeModel = mongoose.models.timeModel || mongoose.model("timeModel", timeSchema);
export default timeModel;