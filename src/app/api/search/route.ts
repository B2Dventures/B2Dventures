import prisma from "@/utils/db";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {

    try {
        const { searchParams } = new URL(request.url);
        const campaignName = searchParams.get('name'); // Get the campaign name from query parameters

        const campaigns = await prisma.campaign.findMany({
            where: {
                name: {
                    contains: campaignName || '',
                    mode: 'insensitive',
                },
            },
            select: {
                id: true,
                name: true,
                description: true,
                images: true,
                investment: {
                    select: {
                        amount: true,
                    },
                },
            },
        });

        const campaignsWithTotalInvestment = campaigns.map(campaign => {
            const totalInvestment = campaign.investment.reduce((sum, inv) => sum + inv.amount.toNumber(), 0);
            const investors = campaign.investment.length;
            return {
                id: campaign.id,
                name: campaign.name,
                description: campaign.description,
                image: campaign.images,
                totalInvestment,
                investors,
            };
        });

        return NextResponse.json({ campaignsWithTotalInvestment });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching campaigns" }, { status: 500 });
    }
}
