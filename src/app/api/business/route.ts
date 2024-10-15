import prisma from "@/utils/db";
import {NextResponse} from 'next/server';

export async function POST(request: Request) {
    try {
        const { id } = await request.json();
        // Query the business based on the provided ID
        const business = await prisma.campaign.findUnique({
            where: {
                id: id, // Use the extracted ID here
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

        if (!business) {
            return NextResponse.json({ error: "Business not found" }, { status: 404 });
        }
        const raised = business.investment.reduce((sum, inv) => sum + inv.amount.toNumber(), 0); // Sum of all investment amounts
        const investors = business.investment.length; // Count of investors

        return  NextResponse.json({
            id: business.id,
            name: business.name,
            goal: business.goal,
            status: business.status,
            raised, // Total amount raised
            investors, // Number of investors
        });

    } catch (error) {
        return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    }
}
