import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import {adminBusinessDetail} from "types/api";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const business = await prisma.business.findUnique({
            where: {
                id: id,
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
                        id: true,
                        email: true,
                    },
                },
            },
        });

        if (!business) {
            return NextResponse.json({ error: "Business not found" }, { status: 404 });
        }
        
        const response: adminBusinessDetail = {
            id: business.id,
            business_name: business.business_name,
            founder_first_name: business.founder_first_name,
            founder_last_name: business.founder_last_name,
            market_cap: business.market_cap,
            company_address: business.company_address,
            business_detail: business.business_detail,
            industry: business.industry,
            logo: business.logo,
            license: business.license,
            approvalStatus: business.approvalStatus,
            userId: business.user.id,
            userEmail: business.user.email,
        }

        return NextResponse.json(response, {status: 200});
    } catch (error) {
        console.error("Error fetching business detail:", error);
        return NextResponse.json({ error: "Error fetching business detail" }, { status: 500 });
    }
}
