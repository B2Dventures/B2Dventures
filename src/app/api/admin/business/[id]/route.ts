import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const business = await prisma.business.findUnique({
            where: {
                id: parseInt(id),
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
                user: {
                    select: {
                        email: true,
                    },
                },
            },
        });

        if (!business) {
            return NextResponse.json({ error: "Business not found" }, { status: 404 });
        }

        return NextResponse.json(business);
    } catch (error) {
        console.error("Error fetching business detail:", error);
        return NextResponse.json({ error: "Error fetching business detail" }, { status: 500 });
    }
}
