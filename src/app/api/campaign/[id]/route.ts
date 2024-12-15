import {NextResponse} from "next/server";
import prisma from "@/utils/db";
import {Campaign} from "types/api";


export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    const campaign = await prisma.campaign.findUnique({
        where: { id: id },
        include: {
            investment: true,
            details: true,
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

    const result: Campaign = {
        id: campaign.id,
        name: campaign.name,
        description: campaign.description,
        images: campaign.images || [],
        goal: campaign.goal.toNumber(),
        raisedAmount,
        daysLeft,
        investors,
        min_invest: campaign.min_invest.toNumber(),
        start_date: campaign.start_date,
        end_date: campaign.end_date,
        highlights: campaign.details?.highlight || "",
        product: campaign.details?.product || "",
        opportunity: campaign.details?.opportunity || "",
        approvalStatus: campaign.approvalStatus,
        industry: campaign.industry,//
        stockPrice: campaign.stockPrice.toNumber()
    };

    return NextResponse.json(result);
}

