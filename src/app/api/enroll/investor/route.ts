import { NextRequest ,NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
    if (auth().sessionClaims?.metadata?.role != "guest") {
        return NextResponse.json({error: "Already have a role or not logged in yet."});
    }
    const body = await req.json();

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

    return NextResponse.json({ success: true, investor });

}
