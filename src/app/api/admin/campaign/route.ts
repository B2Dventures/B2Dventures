import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // TODO: Security part (Authentication/Authorization)

    try {
        // Query to find all campaigns with approvalStatus = PENDING
        const campaigns = await prisma.campaign.findMany({
            where: {
                approvalStatus: "PENDING",
            },
            select: {
                id: true,
                details: {
                    select:{
                        highlight: true,
                    }
                },
                name: true,
                description: true,
                goal: true,
                min_invest: true,
                start_date: true,
                end_date: true,
                status: true,
                image: true,
                approvalStatus: true,
                business: {
                    select: {
                        business_name: true,
                    },
                },
            },
        });

        // If no campaigns with PENDING status are found
        if (campaigns.length === 0) {
            return NextResponse.json(
                { message: "No campaigns with PENDING approval status found" },
                { status: 404 }
            );
        }

        return NextResponse.json(campaigns);
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        return NextResponse.json({ error: "Error fetching campaigns" }, { status: 500 });
    }
}
