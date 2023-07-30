import { connectToDatabase } from "@/dbConfig/dbConfig";
import taskModel from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase();

export async function POST(request: NextRequest) {
    try {
        const { taskName, subTasks, taskType, priority, dueDate, repeat, startTime, endTime, timeAllocated } = await request.json();
        console.log(taskName, subTasks, taskType, priority, dueDate, repeat, startTime, endTime, timeAllocated)
        const newTask = new taskModel({ taskName, subTasks, taskType, priority, dueDate, repeat, startTime, endTime, timeAllocated })
        await newTask.save();
        return NextResponse.json({ message: "New Task created" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}