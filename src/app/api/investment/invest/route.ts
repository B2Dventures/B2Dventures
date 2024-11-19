import prisma from "@/utils/db";
import {NextResponse} from 'next/server';
import { auth } from "@clerk/nextjs/server";
import {InvestmentQuery} from "@/utils/types";

export async function POST(req: Request) {

    if (auth().sessionClaims?.metadata?.role != "investor") {
        return NextResponse.json({ error: 'Not authenticated' }, {status: 401});
    }

    try {
        const { campaignId, amount } = await req.json();

        const id = auth().sessionClaims?.metadata?.id;

        // Convert values to numbers and validate
        const check: InvestmentQuery = {
            campaignId: parseInt(campaignId, 10), // Ensure it's an integer
            amount: Number(amount), // Allow for decimals
        };

        // Validate that all values are valid numbers
        if (isNaN(check.campaignId) || isNaN(check.amount) || !id) {
            return NextResponse.json({ error: 'Invalid query parameters. Must be numbers or can not find userId .' }, {status: 400});
        }

        const investment = await prisma.investment.create({
            data:{
                campaignId: campaignId,
                investorId: id,
                amount: amount,
                approvalStatus: "PENDING"
            }
        });

        return NextResponse.json({ investment });
    } catch (error) {
        return NextResponse.json({ error: "Error to place an investment" }, { status: 500 });
    }
}
