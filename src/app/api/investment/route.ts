import prisma from "@/utils/db";
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

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

