import { NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function GET() {
    try {
        const campaigns = await prisma.campaign.findMany({
            where: { approvalStatus: "APPROVED" },
            include: {
                investment: {
                    select: {
                        investorId: true,
                    },
                },
            },
        });

        const campaignsWithInvestorCounts = campaigns.map((campaign) => {
            const uniqueInvestors = new Set(campaign.investment.map((inv) => inv.investorId));
            return {
                id: campaign.id,
                name: campaign.name,
                description: campaign.description,
                images: campaign.images,
                totalInvestors: uniqueInvestors.size,
            };
        });

        const sortedCampaigns = campaignsWithInvestorCounts
            .sort((a, b) => b.totalInvestors - a.totalInvestors)
            .slice(0, 5);

        const formattedCampaigns = sortedCampaigns.map((campaign) => ({
            id: campaign.id,
            name: campaign.name,
            image: campaign.images[0] || "",
            totalInvestors: campaign.totalInvestors,
        }));

        return NextResponse.json(formattedCampaigns);
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
    }
}
