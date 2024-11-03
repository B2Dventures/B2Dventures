import { NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
    const { userId: clerkId } = auth(req);
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

    try {
        const user = await prisma.user.findUnique({
            where: { clerkId },
            select: { id: true },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const business = await prisma.business.findUnique({
            where: { userId: user.id },
            select: { id: true, approvalStatus: true },
        });

        if (!business) {
            return NextResponse.json({ error: 'You are not a business owner' }, { status: 404 });
        }

        if (business.approvalStatus !== 'APPROVED') {
            return NextResponse.json({ error: 'Business not approved' }, { status: 403 });
        }

        // Create the campaign and associated detail record
        const campaign = await prisma.campaign.create({
            data: {
                businessId: business.id,
                name: title,
                description: description,
                goal: goal,
                min_invest: minimumInvest,
                industry: category,
                start_date: new Date(startDate),
                end_date: new Date(endDate),
                status: "Wait for approval",
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

        return NextResponse.json({ success: true, campaign });
    } catch (error) {
        console.error('Error saving campaign:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
