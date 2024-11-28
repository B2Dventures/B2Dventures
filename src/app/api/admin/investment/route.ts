import {NextResponse} from "next/server";
import prisma from "@/utils/db";
import {adminInvestment} from "types/api";

export async function GET() {
    try {
        const investorSelection = {
            first_name: true,
            last_name: true,
            income: true,
            phone_num: true,
            user: {
                select: {
                    email: true,
                }
            }
        };

        const campaignSelection = {
            name: true,
            business: {
                select: {
                    business_name : true,
                    user: {
                        select: {
                            email: true,
                        },
                    },
                },
            },
        };

        const investments = await prisma.investment.findMany({
            where: {
                approvalStatus: "PENDING",
            },
            select: {
                id: true,
                amount: true,
                timestamp: true,
                investor: {
                    select: investorSelection,
                },
                campaign: {
                    select: campaignSelection,
                },
            },
        });

        const flattenedInvestments: adminInvestment[] = investments.map(investment => ({
            id: investment.id,
            amount: Number(investment.amount),
            timestamp: investment.timestamp,
            investorFirstName: investment.investor?.first_name || "",
            investorLastName: investment.investor?.last_name || "",
            investorIncome: investment.investor?.income || 0,
            investorPhone: investment.investor?.phone_num || "",
            investorEmail: investment.investor?.user?.email || "",
            businessName: investment.campaign?.business?.business_name || "",
            businessOwnerEmail: investment.campaign?.business?.user?.email || "",
            campaignName: investment.campaign?.name || "",
        }));

        return NextResponse.json(flattenedInvestments, {status: 200});

    }

    catch (error) {
        console.error("Error fetching investment:", error);
        return NextResponse.json({ error: "Error fetching investment" }, { status: 500 });
    }

}

