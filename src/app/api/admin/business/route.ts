import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // TODO: Security part (Authentication/Authorization)

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
                registration_cer: true,
                approvalStatus: true,
                campaign: {
                    select: {
                        id: true,
                        name: true,
                        goal: true,
                        status: true,
                        investment: {
                            select: {
                                amount: true,
                            },
                        },
                    },
                },
            },
        });

        // If no businesses with PENDING status are found
        if (businesses.length === 0) {
            return NextResponse.json(
                { message: "No businesses with PENDING approval status found" },
                { status: 404 }
            );
        }

        return NextResponse.json(businesses);
    } catch (error) {
        console.error("Error fetching businesses:", error);
        return NextResponse.json({ error: "Error fetching businesses" }, { status: 500 });
    }
}
