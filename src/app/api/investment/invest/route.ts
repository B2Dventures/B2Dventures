import prisma from "@/utils/db";
import {NextResponse} from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth } from "@clerk/nextjs/server";

interface InvestmentQuery {
    campaignId: number;  // Assuming these are received as strings
    investorId: number;
    amount: number;
}

export async function POST(req: NextApiRequest,
                           res: NextApiResponse) {

    if (auth().sessionClaims?.metadata?.role != "investor") {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const {campaignId, investorId, amount} = req.query as unknown as InvestmentQuery;  // https://domain/api/investment?campaignId=1&investorId=1&amount=9999


    if (!campaignId || !investorId || !amount) {
        return res.status(400).json({ error: 'Missing required query parameters' });
    }

    try {
        const investment = await prisma.investment.create({
            data:{
                campaignId: campaignId,
                investorId: investorId,
                amount: amount,
                approvalStatus: "PENDING"
            }
        });

        return NextResponse.json({ investment });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    }
}
