import {NextResponse} from 'next/server';
import prisma from "@/utils/db";
<<<<<<< Updated upstream
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
=======

export async function POST(req: Request)
{
    type ModelType = 'investor' | 'business' | 'investment' | 'campaign' | 'detailRequest';  // type of thing need approve
    type ModelStatus = "Approved" | "Rejected"
    const validModelTypes: ModelType[] = ['investor', 'business', 'investment', 'campaign', 'detailRequest'];
    const validStatus: string[] = ["Approved", "Rejected"];

    let type: ModelType | null = null;
    let status: ModelStatus | null = null;
>>>>>>> Stashed changes

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id") || "");
    const type = searchParams.get("type") as ModelType;
    const status = searchParams.get("status") as RequestStatus;

<<<<<<< Updated upstream
    if (!id || !type || !status) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

=======
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get('id'));
    const typeParam = searchParams.get('type');
    const statusParam = searchParams.get('status');

    // const { id, type, status } = req.query as unknown as ApprovalQuery;

    if ( !id || !typeParam || !statusParam) {
        return NextResponse.json({ error: 'Missing required query parameters' });
    }

    if (validModelTypes.includes(typeParam as ModelType)) {
        type = typeParam as ModelType;  // only allow type that listed in model type
    } else {
        return NextResponse.json({ error: 'Invalid type' });
    }

    if (validStatus.includes(statusParam as ModelType)) {
        status = statusParam as ModelStatus;  // only allow status that listed in model status
    } else {
        return NextResponse.json({ error: 'Invalid status' });
    }


>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            return NextResponse.json({ message: `Successfully updated status to ${status}` });
        } else {
            return NextResponse.json({ error: `ID: ${id} not found in ${type}` }, { status: 404 });
        }
    } catch (error) {
        console.error("Error updating approval status:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
=======
            NextResponse.json({ success: true, message:`Successfully updated status to ${status}`});
        } else {
            NextResponse.json({error: `ID: ${id} Not Found on ${type}`}, {status: 404});
        }
    }
    else {
        NextResponse.json({error: `Wrong type: ${type} doesn't exist`});
>>>>>>> Stashed changes
    }
}
