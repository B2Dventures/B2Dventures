import prisma from "@/utils/db";
<<<<<<< Updated upstream
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
=======
import {NextResponse} from 'next/server';
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {

    if (auth().sessionClaims?.metadata?.role != "investor") {
        return NextResponse.json({ error: 'Not authenticated' }, {status: 401});
    }
    const { searchParams } = new URL(req.url);
    const campaignId = Number(searchParams.get("campaignId"));
    const investorId = Number(searchParams.get("investorId"));
    const amount = Number(searchParams.get("amount"));


    if (!campaignId || !investorId || !amount) {
        return NextResponse.json({ error: 'Missing required query parameters' }, {status: 400});
    }
>>>>>>> Stashed changes

export async function GET(req: NextRequest) {
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

        return NextResponse.json({ success: true, investments });

    } catch (error) {
        console.error("Error retrieving investments:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

