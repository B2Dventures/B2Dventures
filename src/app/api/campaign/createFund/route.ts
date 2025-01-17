import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/utils/db";
import { createFundQuery } from "types/models";

export async function POST(req: NextRequest) {
    const user = auth();

    if (user.sessionClaims?.metadata?.role !== "business") {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body: createFundQuery = await req.json();
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
        opportunity,
        images,
        stockPrice
    } = body;

    const id = user.sessionClaims?.metadata?.id;

    if (!id) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Backend validation for required fields
    if (
        !title ||
        !description ||
        !goal ||
        !minimumInvest ||
        !category.length ||
        !startDate ||
        !endDate ||
        !highlight ||
        !product ||
        !opportunity ||
        !images.length ||
        !stockPrice
    ) {
        return NextResponse.json(
            { error: "All fields are required" },
            { status: 400 }
        );
    }

    const business = await prisma.business.findUnique({
        where: {
            userId: id,
        },
        select: {
            id: true,
        },
    });

    if (!business) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const campaign = await prisma.campaign.create({
        data: {
            businessId: business.id,
            name: title,
            description,
            goal,
            min_invest: minimumInvest,
            industry: category,
            start_date: new Date(startDate),
            end_date: new Date(endDate),
            images,
            approvalStatus: "PENDING",
            stockPrice: stockPrice,
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
        return NextResponse.json(
            { error: "Error saving campaign" },
            { status: 400 }
        );
    }

    return NextResponse.json({ success: true, campaign });
}
