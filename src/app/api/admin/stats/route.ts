import { NextResponse } from "next/server";
import { createStatsService } from "@/services/statsService";

export async function GET() {
  try {
    const statsService = await createStatsService();
    const stats = await statsService.getDashboardStats();

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 },
    );
  }
}
