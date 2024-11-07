import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        // Find investor by ID with associated user email
        const investor = await prisma.investor.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                nationality: true,
                passport_num: true,
                phone_num: true,
                birth_date: true,
                address: true,
                occupation: true,
                income: true,
                passport_img: true,
                approvalStatus: true,
                user: {
                    select: {
                        email: true,
                    },
                },
            },
        });

        if (!investor) {
            return NextResponse.json({ error: "Investor not found" }, { status: 404 });
        }

        return NextResponse.json(investor);
    } catch (error) {
        console.error("Error fetching investor detail:", error);
        return NextResponse.json({ error: "Error fetching investor detail" }, { status: 500 });
    }
}
