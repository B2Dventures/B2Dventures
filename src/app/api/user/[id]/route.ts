import prisma from "@/utils/db";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id')|| '', 10);

    // Check if id is a valid number
    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    try {
        // Find the user by id
        const user = await prisma.user.findUnique({
            where: { id },
        });

        // If the user is not found
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Return the user data
        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
    }
}
