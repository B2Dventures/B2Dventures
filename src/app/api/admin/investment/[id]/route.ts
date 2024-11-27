import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const investment = await prisma.investment.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                campaign: {
                    select: {
                        name: true,
                        description: true,
                        business: {
                            select: {
                                business_name: true,
                            }
                        }
                    }
                },
                investor: {
                    select: {
                        first_name: true,
                        last_name: true,
                        passport_num: true,
                        phone_num: true,
                    }
                },
                id: true,
                amount: true,
                timestamp: true,
                approvalStatus: true,
            }
        });

        if (!investment) {
            return NextResponse.json({ error: "Investment not found" }, { status: 404 });
        }

        return NextResponse.json(investment);
    } catch (error) {
        console.error("Error fetching investment detail:", error);
        return NextResponse.json({ error: "Error fetching investment detail" }, { status: 500 });
    }
}
