import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
    if (auth().sessionClaims?.metadata?.role != "business") {
        return NextResponse.json({error: "Not have authenticated"}, {status: 401});
    }
    const body = await req.json();

    const {
        title,
        description,
        goal,
        minimumInvest,
        category,
        startDate,
        endDate,
        highlight,
        product,
        opportunity
    } = body;

    const id = auth().sessionClaims?.metadata?.id;

    if (!id) {
        return NextResponse.json({error: "User not found"}, {status: 404});
    }
    const campaign = await prisma.campaign.create({
        data: {
            businessId: id,
            name: title,
            description: description,
            goal: goal,
            min_invest: minimumInvest,
            industry: category,
            start_date: new Date(startDate),
            end_date: new Date(endDate),
            image: "https://example.com/logo-url.jpg",
            approvalStatus: "PENDING",
            details: {
                create: {
                    highlight,
                    product,
                    opportunity,
                },
            },
        },
    });
    if (!campaign) {
        return NextResponse.json({error: "Error saving campaign"}, {status: 400});
    }
    return NextResponse.json({ success: true, campaign });

}
