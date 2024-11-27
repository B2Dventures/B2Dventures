import {NextResponse} from 'next/server';

import prisma from "@/utils/db";
import {approvalsQuery} from "types/models";

type ModelType = 'investor' | 'business' | 'investment' | 'campaign' | 'detailRequest';

const modelMap: Record<ModelType, any> = {
    investor: prisma.investor,
    business: prisma.business,
    investment: prisma.investment,
    campaign: prisma.campaign,
    detailRequest: prisma.detailRequest,
};

export async function POST(req: Request)
{

    const payload: approvalsQuery = await req.json();
    const {id, type, status} = payload;
    if ( !id || !type || !status) {
        return NextResponse.json({ error: 'Missing required parameters' });
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
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
