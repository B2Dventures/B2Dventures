import prisma from "@/utils/db";
import { NextResponse } from 'next/server';
import {CampaignData} from "@/utils/types";
import {auth} from "@clerk/nextjs/server";


export async function POST(request: Request) {

    if (auth().sessionClaims?.metadata?.role != "business") {
        NextResponse.json({ error: "Not authenticate" }, { status: 401 });
    }

    try {
        const data = await request.json();
        const { id: userId } = data;

        const business = await prisma.business.findUnique({
            where: {
                userId: userId,
            },
        });

        if (!business) {
            return NextResponse.json({ error: "Business not found" }, { status: 404 });
        }

        const businessId = business.id; // Get the business ID

        const campaigns = await prisma.campaign.findMany({
            where: {
                businessId: businessId, // Use the business ID here
            },
            select: {
                id: true,
                name: true,
                goal: true,
                approvalStatus: true,
                investment: {
                    select: {
                        amount: true,
                    }
                }
            }
        });

        const responseData: CampaignData[] = campaigns.map(campaign => ({
            id: campaign.id,
            name: campaign.name,
            goal: campaign.goal.toNumber(),
            raised: campaign.investment.reduce((sum, inv) => sum + inv.amount.toNumber(), 0),
            investors: campaign.investment.length,
            status: campaign.approvalStatus
        }));

        return NextResponse.json(responseData);

    } catch (error) {
        console.error("Error fetching campaigns:", error);
        return NextResponse.json({ error: "Error fetching campaigns" }, { status: 500 });
    }
}
