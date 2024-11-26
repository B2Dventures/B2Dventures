import prisma from "@/utils/db";
import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";

import {InvestmentQuery} from "types/models";
import {InvestmentDashboard} from "types/api";


export async function POST(req: Request) {

    if (auth().sessionClaims?.metadata?.role != "investor") {
        return NextResponse.json({ error: 'Not authenticated' }, {status: 401});
    }

    try {
        const { campaignId, amount } : InvestmentQuery = await req.json();
        const id = auth().sessionClaims?.metadata?.id;

        if (isNaN(campaignId) || isNaN(amount) || !id) {
            return NextResponse.json({ error: 'Invalid query parameters. Must be numbers or can not find userId .' }, {status: 400});
        }
        const investor = await prisma.investor.findUnique({
            where : {
                userId : id
            },
            select : {
                id : true
            }
        })

        if (!investor) {
            return NextResponse.json({error : "Investor not found"})
        }

        const investment = await prisma.investment.create({
            data:{
                campaignId: Number(campaignId),
                investorId: investor.id,
                amount: Number(amount),
                approvalStatus: "PENDING"
            }
        });

        return NextResponse.json({ investment });
    } catch (error) {
        return NextResponse.json({ error: "Error to place an investment" }, { status: 500 });
    }
}


export async function GET() {
    try {
        const userId = auth().sessionClaims?.metadata?.id;

        if (!userId) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const investor = await prisma.investor.findUnique({
            where: { userId: userId },
            select: { id: true },
        });

        if (!investor) {
            return NextResponse.json({ error: "Investor not found" }, { status: 404 });
        }

        const investorId = investor.id;

        const investments = await prisma.investment.findMany({
            where: { investorId: investorId },
            select: {
                amount: true,
                timestamp: true,
                approvalStatus: true,
                campaign: {
                    select: {
                        name: true,
                    }
                }
            }
        });

        const result: InvestmentDashboard[] = investments.map(investment => ({
            amount: (investment.amount).toNumber(), // Convert Decimal to number
            timestamp: investment.timestamp,
            approvalStatus: investment.approvalStatus,
            campaign: investment.campaign
        }));


        return NextResponse.json({ success: true, investments });

    } catch (error) {
        console.error("Error retrieving investments:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

