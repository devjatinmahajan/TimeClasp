import { connectToDatabase } from "@/dbConfig/dbConfig";
import timeModel from "@/models/timeModel";
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: { id: string } }) {
    await connectToDatabase()
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    try {
        let allTasks: any = [];
        if (params.id) {
            allTasks = await timeModel.find({ userId: params.id, date: { $gte: thirtyDaysAgo.toISOString().slice(0, 10) } }).populate("tasks.taskId");
        }
        return NextResponse.json({ allTasks }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ err }, { status: 404 })
    }
}