import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { RequestStatus } from "@prisma/client";  // Ensure RequestStatus is defined in Prisma schema

type ModelType = 'investor' | 'business' | 'investment' | 'campaign' | 'detailRequest';

const modelMap: Record<ModelType, any> = {
    investor: prisma.investor,
    business: prisma.business,
    investment: prisma.investment,
    campaign: prisma.campaign,
    detailRequest: prisma.detailRequest,
};

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id") || "");
    const type = searchParams.get("type") as ModelType;
    const status = searchParams.get("status") as RequestStatus;

    if (!id || !type || !status) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const table = modelMap[type];

    if (!table) {
        return NextResponse.json({ error: `Invalid type: ${type} does not exist` }, { status: 404 });
    }

    try {
        const updateData = await table.update({
            where: { id },
            data: { approvalStatus: status },
        });

        if (updateData) {
            return NextResponse.json({ message: `Successfully updated status to ${status}` });
        } else {
            return NextResponse.json({ error: `ID: ${id} not found in ${type}` }, { status: 404 });
        }
    } catch (error) {
        console.error("Error updating approval status:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
