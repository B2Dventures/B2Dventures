import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const campaign = await prisma.campaign.findUnique({
            where: { id: parseInt(id, 10) },
            include: {
                investment: true,
                details: true
            },
        });

        if (!campaign) {
            return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
        }

        const raisedAmount = campaign.investment.reduce(
            (total, inv) => total + inv.amount.toNumber(),
            0
        );

        const today = new Date();
        const endDate = new Date(campaign.end_date);
        const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

        const investors = campaign.investment.length;

        return NextResponse.json({
            id: campaign.id,
            name: campaign.name,
            description: campaign.description,
            images: campaign.images,
            goal: campaign.goal.toNumber(),
            raisedAmount,
            daysLeft,
            investors,
            min_invest: campaign.min_invest.toNumber(),
            industry: campaign.industry,
            start_date: campaign.start_date,
            end_date: campaign.end_date,
            details: campaign.details,
            approvalStatus: campaign.approvalStatus,
        });
    } catch (error) {
        console.error("Error fetching campaign:", error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}
