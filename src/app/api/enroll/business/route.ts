import { NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {

    if (auth().sessionClaims?.metadata?.role != "guest") {
        return NextResponse.json({error: "Already have a role or not logged in yet."});
    }

    const body = await req.json();

    const {
        businessName,
        founderFirstName,
        founderLastName,
        marketCap,
        companyAddress,
        businessDetail,
        industry,
        logo,
        registrationCer,
        license,
    } = body;

    const userId = auth().sessionClaims?.metadata?.id;

    if (!userId) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const business = await prisma.business.create({
        data: {
            userId: userId, // Reference to the user's ID
            business_name: businessName,
            founder_first_name: founderFirstName,
            founder_last_name: founderLastName,
            market_cap: marketCap,
            company_address: companyAddress,
            business_detail: businessDetail,
            industry: industry,
            logo: logo,
            license: license,
            registration_cer: registrationCer,
            approvalStatus: "PENDING",
        },
    });

    if (!business) {
        return NextResponse.json({ error: 'Create Not Successfully' }, { status: 401 });
    }

    return NextResponse.json({ success: true, business });
}
