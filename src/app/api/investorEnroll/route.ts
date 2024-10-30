import { NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
    const { userId: clerkId } = auth(req); // Retrieve clerkId
    const body = await req.json();

    const {
        email,
        firstName,
        lastName,
        nationality,
        passportNumber,
        phoneNumber,
        birthDate,
        address,
        occupation,
        income,
        approvalStatus,
    } = body;

    if (!firstName || !lastName || !passportNumber || !birthDate) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const parsedBirthDate = new Date(birthDate);
    if (isNaN(parsedBirthDate.getTime())) {
        return NextResponse.json({ error: 'Invalid birth date format' }, { status: 400 });
    }

    try {
        const sampleImgURL = "https://example.com/default-image-url.jpg";
        const user = await prisma.user.create({
            data: {
                email,
                role: 'Investor',
                clerkId, // Include clerkId here
                investor: {
                    create: {
                        first_name: firstName,
                        last_name: lastName,
                        nationality,
                        passport_num: passportNumber,
                        phone_num: phoneNumber,
                        birth_date: parsedBirthDate,
                        address,
                        occupation,
                        income,
                        passport_img: sampleImgURL,
                        approvalStatus: 'PENDING',
                    },
                },
            },
        });

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error('Error saving investor:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
