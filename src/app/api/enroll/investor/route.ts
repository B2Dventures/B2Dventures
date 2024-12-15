import {NextRequest, NextResponse} from 'next/server';
import {auth, createClerkClient} from '@clerk/nextjs/server';
import prisma from '@/utils/db';
import {enrollInvestorQuery} from "types/models";

export async function POST(req: NextRequest) {
    if (auth().sessionClaims?.metadata?.role != "guest") {
        return NextResponse.json({error: "Already have a role or not logged in yet."});
    }

    const body: enrollInvestorQuery = await req.json();
    const clerkClient = createClerkClient({secretKey: process.env.CLERK_SECRET_KEY})

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
        return NextResponse.json({error: 'Invalid birth date format'}, {status: 400});
    }

    const userId = auth().sessionClaims?.metadata?.id;

    if (!userId) {
        return NextResponse.json({error: 'User not found'}, {status: 404});
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            clerkId: true
        },
    });

    if (!user) {
        return NextResponse.json({error: 'User not found'}, {status: 404});
    }

    const existingInvestor = await prisma.investor.findUnique({
        where: {
            userId: userId,
        },
    });

    if (existingInvestor && existingInvestor.approvalStatus !== 'REJECTED') {
        return NextResponse.json({error: 'You have already submitted your application. Please wait for approval or rejection.'}, {status: 400});
    }

    const investor = await prisma.investor.create({
        data: {
            userId: userId,
            first_name: firstName,
            last_name: lastName,
            nationality: nationality,
            passport_num: passportNumber,
            phone_num: phoneNumber,
            birth_date: parsedBirthDate,
            address: address,
            occupation: occupation,
            income: income,
            passport_img: passport_img,
            approvalStatus: 'PENDING',
        },
    });

    if (!investor) {
        return NextResponse.json({error: 'Creation failed'}, {status: 400});
    }

    // Update user role to 'Investor'
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { role: 'Investor' },
    });

    if (!updatedUser) {
        return NextResponse.json({ error: 'Failed to update user role' }, { status: 400 });
    }

    try {
        const response = await clerkClient.users.updateUserMetadata(user.clerkId, {
            publicMetadata: {
                role: "investor"
            }
        });
        if (!response) {
            return NextResponse.json({error: "Error updating Clerk metadata"}, {status: 400});
        }
    } catch (error) {
        console.error('Error updating Clerk metadata:', error);
        return NextResponse.json({error: 'Error updating user role'}, {status: 500});
    }

    return NextResponse.json({success: true, investor});
}
