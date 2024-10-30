import prisma from "@/utils/db";
import {NextResponse} from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next'

interface InvestmentQuery {
    campaignId: string;  // Assuming these are received as strings
    investorId: string;
    amount: string;
}

export async function POST(req: NextApiRequest,
                           res: NextApiResponse) {
    // TODO:Security part

    const {campaignId, investorId, amount} = req.query as unknown as InvestmentQuery;  // https://domain/api/investment?campaignId=1&investorId=1&amount=9999
    const campaignIdNumber = parseInt(campaignId, 10);
    const investorIdNumber = parseInt(investorId, 10);
    const amountNumber = parseFloat(amount);

    if (!campaignId || !investorId || !amount) {
        return res.status(400).json({ error: 'Missing required query parameters' });
    }

    try {
        const investment = await prisma.investment.create({
            data:{
                campaignId: campaignIdNumber,
                investorId: investorIdNumber,
                amount: amountNumber,
                approvalStatus: "PENDING"
            }
        });

        return NextResponse.json({ investment });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    }
}
