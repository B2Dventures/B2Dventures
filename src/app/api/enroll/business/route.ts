import { NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { auth, createClerkClient } from '@clerk/nextjs/server';
import {enrollBusinessQuery} from "types/models";

export async function POST(req: Request) {
    const session = auth();
    const role = session?.sessionClaims?.metadata?.role;
    const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

    if (!session || (role !== "guest" && role !== "investor")) {
        return NextResponse.json({ error: "Already have a role or not logged in yet." });
    }

    const body: enrollBusinessQuery = await req.json();

    const {
        businessName,
        founderFirstName,
        founderLastName,
        marketCap,
        companyAddress,
        businessDetail,
        industry,
        logo,
        license,
    } = body;

    const userId = session?.sessionClaims?.metadata?.id;

    if (!userId) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
        where: {
            id: Number(userId),
        },
        select:{
            clerkId: true
        },
    })

    if (!user) {
        return NextResponse.json({ error: 'User not Fond' }, {status: 404});
    }

    const business = await prisma.business.create({
        data: {
            userId: userId,
            business_name: businessName,
            founder_first_name: founderFirstName,
            founder_last_name: founderLastName,
            market_cap: marketCap,
            company_address: companyAddress,
            business_detail: businessDetail,
            industry: industry,
            logo: logo,
            license: license,
            approvalStatus: "PENDING",
        },
    });

    if (!business) {
        return NextResponse.json({ error: 'Create Not Successfully' }, { status: 401 });
    }

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { role: 'Business' },
    });

    if (!updatedUser) {
        return NextResponse.json({ error: 'Failed to update user role' }, { status: 400 });
    }

    try {
        const response = await clerkClient.users.updateUserMetadata(user.clerkId, {
            publicMetadata : {
                role : "business"
            }

        });
    } catch (error) {
        console.error('Error updating Clerk metadata:', error);
        return NextResponse.json({ error: 'Error updating user role' }, { status: 500 });
    }

    return NextResponse.json({ success: true, business });
}
