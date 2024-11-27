import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import {adminCampaign} from "types/api";

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

        const response : adminCampaign[] = campaigns.map(campaign => ({
            id: campaign.id,
            name: campaign.name,
            description: campaign.description,
            goal: campaign.goal.toNumber(),
            minInvest: campaign.min_invest.toNumber(),
            startDate: campaign.start_date,
            endDate: campaign.end_date,
            images: campaign.images,
            approvalStatus: campaign.approvalStatus,
            industry: campaign.industry,
            businessName: campaign.business.business_name,
            highlights: campaign.details?.highlight || "",
        }))



        // Return an empty array with a 200 status if no pending campaigns
        return NextResponse.json(response.length > 0 ? response : []);
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        return NextResponse.json({ error: "Error fetching campaigns" }, { status: 500 });
    }
}
