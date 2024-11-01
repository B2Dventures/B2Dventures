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

    const parsedBirthDate = new Date(birthDate);
    if (isNaN(parsedBirthDate.getTime())) {
        return NextResponse.json({ error: 'Invalid birth date format' }, { status: 400 });
    }

    try {
        const sampleImgURL = "https://example.com/default-image-url.jpg";

        const user = await prisma.user.findUnique({
            where: { clerkId },
            select: { id: true }, // Select only the user ID
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const userId = user.id; // Retrieve the user ID from the user record

        await prisma.user.update({
            where: { id: userId },
            data: {
                role: 'Investor',
            },
        });

        // Create an investor and link it to the user
        const investor = await prisma.investor.create({
            data: {
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
                user: { connect: { id: userId } }, // Connect the Investor to the User
            },
        });

        return NextResponse.json({ success: true, investor });
    } catch (error) {
        console.error('Error saving investor:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
