import {NextResponse} from 'next/server';

import prisma from "@/utils/db";

type ModelType = 'investor' | 'business' | 'investment' | 'campaign' | 'detailRequest';
type ModelStatus = "APPROVED" | "REJECTED"

const modelMap: Record<ModelType, any> = {
    investor: prisma.investor,
    business: prisma.business,
    investment: prisma.investment,
    campaign: prisma.campaign,
    detailRequest: prisma.detailRequest,
};

export async function POST(req: Request)
{
    const validModelTypes: ModelType[] = ['investor', 'business', 'investment', 'campaign', 'detailRequest'];
    const validStatus: string[] = ["APPROVED", "REJECTED"];

    let type: ModelType | null = null;
    let status: ModelStatus | null = null;

    // TODO: replace with payload
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get('id'));
    const typeParam = searchParams.get('type');
    const statusParam = searchParams.get('status');

    if ( !id || !typeParam || !statusParam) {
        return NextResponse.json({ error: 'Missing required query parameters' });
    }

    if (validModelTypes.includes(typeParam as ModelType)) {
        type = typeParam as ModelType;  // only allow type that listed in model type
    } else {
        return NextResponse.json({ error: 'Invalid type' });
    }

    if (validStatus.includes(statusParam as ModelStatus)) {
        status = statusParam as ModelStatus;  // only allow status that listed in model status
    } else {
        return NextResponse.json({ error: 'Invalid status' });
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
