import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const campaigns = await prisma.campaign.findMany({
            where: {
                approvalStatus: "PENDING",
            },
            select: {
                id: true,
                details: {
                    select: {
                        highlight: true,
                    }
                },
                name: true,
                description: true,
                goal: true,
                min_invest: true,
                start_date: true,
                end_date: true,
                images: true,
                approvalStatus: true,
                industry: true,
                business: {
                    select: {
                        business_name: true,
                    },
                },
            },
        });

        // Return an empty array with a 200 status if no pending campaigns
        return NextResponse.json(campaigns.length > 0 ? campaigns : []);
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        return NextResponse.json({ error: "Error fetching campaigns" }, { status: 500 });
    }
}
