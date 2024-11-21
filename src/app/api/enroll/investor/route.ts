import { NextRequest ,NextResponse } from 'next/server';
import prisma from '@/utils/db';
import {auth, createClerkClient} from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
    if (auth().sessionClaims?.metadata?.role != "guest") {
        return NextResponse.json({error: "Already have a role or not logged in yet."});
    }
    const body = await req.json();
    const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

    const {
        firstName,
        lastName,
        nationality,
        passportNumber,
        phoneNumber,
        birthDate,
        address,
        occupation,
        income,
        passport_img,
    } = body;

    const parsedBirthDate = new Date(birthDate);
    if (isNaN(parsedBirthDate.getTime())) {
        return NextResponse.json({ error: 'Invalid birth date format' }, { status: 400 });
    }

    const userId = auth().sessionClaims?.metadata?.id;

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

    const investor = await prisma.investor.create({
        data: {
            userId: userId,
            first_name: firstName,
            last_name: lastName,
            nationality,
            passport_num: passportNumber,
            phone_num: phoneNumber,
            birth_date: parsedBirthDate,
            address,
            occupation,
            income,
            passport_img,
            approvalStatus: 'PENDING',
        },
    });

    if (!investor) {
        return NextResponse.json({ error: 'Create Not Successfully' }, { status: 401 });
    }

    try {
        const response = await clerkClient.users.updateUserMetadata(user.clerkId, {
            publicMetadata : {
                role : "investor"
            }

        });
    } catch (error) {
        console.error('Error updating Clerk metadata:', error);
        return NextResponse.json({ error: 'Error updating user role' }, { status: 500 });
    }

    return NextResponse.json({ success: true, investor });

}
