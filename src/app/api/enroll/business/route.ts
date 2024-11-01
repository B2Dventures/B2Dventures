import { NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
    const { userId: clerkId } = auth(req);
    const body = await req.json();

    const {
        businessName,
        founderFirstName,
        founderLastName,
        phoneNumber,
        marketCap,
        companyAddress,
        businessDetail,
        industry,
        logo,
        registrationCer,
        license,
    } = body;

    try {
        const user = await prisma.user.findUnique({
            where: { clerkId },
            select: { id: true }, // Select only the user ID
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const userId = user.id; // Retrieve the user ID from thpull user record

        await prisma.user.update({
            where: { id: userId },
            data: {
                role: 'Business',
            },
        });

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
                logo: "https://example.com/logo-url.jpg",
                license: "https://example.com/license-url.jpg",
                registration_cer: "https://example.com/registrationCer-url.jpg",
                approvalStatus: "PENDING",
            },
        });

        return NextResponse.json({ success: true, business });
    } catch (error) {
        console.error('Error saving business:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
