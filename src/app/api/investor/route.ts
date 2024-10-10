import prisma from "@/lib/db";
import {NextResponse} from 'next/server';

export async function GET() {
    try {
        const users = await prisma.investor.findMany();

        return NextResponse.json({ users });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    }
}
