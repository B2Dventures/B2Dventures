import type { NextApiRequest } from "next";
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

import prisma from "@/utils/db";
import {RequestData} from "types/api";


export async function GET(req: NextApiRequest) {
    // security part
    const user = auth().sessionClaims?.metadata;
    const Uid  = user?.id;
    const role = user?.role;
    // check user exist and role valid
    if (!Uid || role != "business") {
        return NextResponse.json({ error: 'Not authenticated' }, {status: 401})
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
        return NextResponse.json({ error: 'Not Found' }, {status: 401})
    }

    const requestData: RequestData[] = detailRequests.map((detail) => ({
        id: detail.id,
        campaignId: detail.campaign.id,
        firstName: detail.investor.first_name,
        lastName: detail.investor.last_name,
        income: detail.investor.income,
        email: detail.investor.user.email,
    }));

    return NextResponse.json({success: true, data: requestData}, {status: 200});

}


export async function POST(req: Request) {
    // security part
    const user = auth().sessionClaims?.metadata;
    const Uid  = user?.id;
    const role = user?.role;
    // check user exist and role valid
    if (!Uid || role != "investor") {
        return NextResponse.json({ error: 'Not authenticated' }, {status: 401})
    }

    // TODO:using payload will fix next commit
    // params must have id campaign
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
        return NextResponse.json({error: 'Missing required query parameters'}, {status: 400})
    }

    // Adding to DB if pass though all guard clause
    const result = await prisma.detailRequest.create({
        data: {
            campaignId: Number(id),
            investorId: Uid,
            approvalStatus: "PENDING",
        }
    })
    if (!result) {
        return NextResponse.json({ error: 'Create Not Successfully' }, {status: 401})
    }

    return NextResponse.json({success: "Successfully"}, {status: 200})
}