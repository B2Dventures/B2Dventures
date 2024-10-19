import prisma from "@/utils/db";
import {NextResponse} from 'next/server';

export async function GET() {

    // TODO:Security part

    try {
        const campaigns = await prisma.campaign.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                image: true,
                // Include any other campaign fields you need
                investment: {
                    select: {
                        amount: true,
                    },
                },
            },
        });

        const campaignsWithTotalInvestment = campaigns.map(campaign => {
            const totalInvestment = campaign.investment.reduce((sum, inv) => sum + inv.amount.toNumber(), 0); // Sum amounts
            const investors = campaign.investment.length; //
            return {
                id: campaign.id,
                name: campaign.name,
                description: campaign.description,
                image: campaign.image,
                totalInvestment,
                investors,
            };
        });

        return NextResponse.json({ campaignsWithTotalInvestment });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    }
}
