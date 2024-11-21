import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Query to find all businesses with approvalStatus = PENDING
        const businesses = await prisma.business.findMany({
            where: {
                approvalStatus: "PENDING",
            },
            select: {
                id: true,
                business_name: true,
                founder_first_name: true,
                founder_last_name: true,
                market_cap: true,
                company_address: true,
                business_detail: true,
                industry: true,
                logo: true,
                license: true,
                approvalStatus: true,
                user: {
                    select: {
                        email: true,
                    }
                }
            },
        });

        return NextResponse.json(businesses.length > 0 ? businesses : []);
    } catch (error) {
        console.error("Error fetching businesses:", error);
        return NextResponse.json({ error: "Error fetching businesses" }, { status: 500 });
    }
}
