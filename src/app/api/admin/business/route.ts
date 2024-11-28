import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import {adminBusiness} from "types/api";

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

        if (!businesses) {
            return NextResponse.json({error: 'Not Found'}, {status: 404})
        }

        const businessesData: adminBusiness[] = businesses.map((business) => ({
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
            userEmail: business.user.email,
        }))

        return NextResponse.json(businessesData.length > 0 ? businessesData : []);
    } catch (error) {
        console.error("Error fetching businesses:", error);
        return NextResponse.json({ error: "Error fetching businesses" }, { status: 500 });
    }
}
