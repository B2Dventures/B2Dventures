import prisma from "@/utils/db";
import type {NextApiRequest, NextApiResponse} from "next";

interface ApprovalQuery {
    id: number,
    type: string,
    status: "Approved" | "Rejected"
}

export async function POST(req: NextApiRequest,
                           res: NextApiResponse) {
    type ModelType = 'investor' | 'business' | 'investment' | 'campaign' | 'detailRequest';  // type of thing need approve

    const modelMap: Record<ModelType, any> = {
        investor: prisma.investor,
        business: prisma.business,
        investment: prisma.investment,
        campaign: prisma.campaign,
        detailRequest: prisma.detailRequest
    };

    const { id, type, status } = req.query as unknown as ApprovalQuery;

    if ( !id || !type || !status) {
        return res.status(400).json({ error: 'Missing required query parameters' });
    }

    const table = modelMap[type as ModelType];   // only allow type that listed in model type

    if (modelMap[type as ModelType]) {
        const updateData = await table.update({
            where: {
                id : id
            },
            data: {
                status: status,
            }
        })
        if (updateData) {
            res.status(200).json(`Successfully updated status to ${status}`);
        } else {
            res.status(404).json({error: `ID: ${id} Not Found on ${type}`});
        }
    }
    else {
        res.status(404).json({error: `Wrong type: ${type} doesn't exist`});
    }
}
