import prisma from "@/utils/db";
import {NextResponse} from 'next/server';

export async function POST(request: Request) {
    console.log(request);

    try {
        const data = await request.json();
        console.log(data); // Outputs the parsed JSON object
        const { id } = data;
        // Query the business based on the provided ID
        const Campaigns = await prisma.campaign.findMany({
            where: {
                businessId: id, // Use the extracted ID here
            },
            select: {
                id: true,
                name: true,
                goal: true,
                status: true,
                investment: {
                    select: {
                        amount: true,
                    }
                }
            }
        });

        if (!Campaigns) {
            return NextResponse.json({ error: "Business not found" }, { status: 404 });
        }
        // investment.reduce((sum, inv) => sum + inv.amount.toNumber(), 0);
        const Data = Campaigns.map(campaign => ({
                id: campaign.id,
                name: campaign.name,
                goal: campaign.goal,
                status: campaign.status,
                raised: campaign.investment.reduce((sum, inv) => sum + inv.amount.toNumber(), 0),
                investors: campaign.investment.length
            }
        )) // Sum of all investment amounts

        console.log(data);

        return  NextResponse.json(Data);

    } catch (error) {
        return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    }
}
