import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // TODO: Security part

    try {
        // Query to find all investors with approvalStatus = PENDING
        const investors = await prisma.investor.findMany({
            where: {
                approvalStatus: "PENDING",
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                nationality: true,
                passport_num: true,
                birth_date: true,
                address: true,
                occupation: true,
                income: true,
                passport_img: true,
                approvalStatus: true,
            },
        });

        if (investors.length === 0) {
            return NextResponse.json(
                { message: "No investors with PENDING approval status found" },
                { status: 404 }
            );
        }

        return NextResponse.json(investors);
    } catch (error) {
        console.error("Error fetching investors:", error);
        return NextResponse.json({ error: "Error fetching investors" }, { status: 500 });
    }
}
