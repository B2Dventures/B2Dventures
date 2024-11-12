import type {NextApiRequest, NextApiResponse} from "next";
import { createClerkClient , auth } from '@clerk/nextjs/server';
import prisma from "@/utils/db";
import {RequestData} from "@/utils/types";

interface RequestQuery {
    id : number
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    // security partRequest
    const user = auth().sessionClaims?.metadata;
    const Uid  = user?.id;
    const role = user?.role;
    // check user exist and role valid
    if (!Uid || role != "business") {
        return res.status(401).json({ error: 'Not authenticated' })
    }    // params must have id campaign

    const detailRequests = await prisma.detailRequest.findMany({
        where: {
            campaign: {
                businessId: Uid, // Replace `parameter` with the specific businessId you’re searching for
            },
            approvalStatus: "PENDING", // Only include records where approvalStatus is "PENDING"
        },
        select: {
            id: true,
            approvalStatus: true,
            campaign: {
                select: {
                    id: true, // Add other fields from Campaign as needed
                },
            },
            investor: {
                select: {
                    first_name: true,
                    last_name: true,
                    income: true,
                    user: {
                        select: {
                            email: true,
                        },
                    },
                },
            },
        },
    });

    if(!detailRequests) {
        return res.status(401).json({ error: 'Not Found' })
    }

    const requestData: RequestData[] = detailRequests.map((detail) => ({
        id: detail.id,
        campaignId: detail.campaign.id,
        firstName: detail.investor.first_name,
        lastName: detail.investor.last_name,
        netWorth: detail.investor.income,
        email: detail.investor.user.email,
    }));

    return res.status(200).json({success: true, data: requestData});


}


export async function POST(req: NextApiRequest, res: NextApiResponse) {
    // security part
    const user = auth().sessionClaims?.metadata;
    const Uid  = user?.id;
    const role = user?.role;
    // check user exist and role valid
    if (!Uid || role != "investor") {
        return res.status(401).json({ error: 'Not authenticated' })
    }

    // params must have id campaign
    const { id } = req.query as unknown as RequestQuery;
    if (!id) {
        return res.status(400).json({ error: 'Missing required query parameters' });
    }

    // Adding to DB if pass though all guard clause
    const result = await prisma.detailRequest.create({
        data: {
            campaignId: id,
            investorId: Uid,
            approvalStatus: "PENDING",
        }
    })
    if (!result) {
        return res.status(401).json({ error: 'Create Not Successfully' })
    }

    return res.status(200).json({success: "Successfully"})
}