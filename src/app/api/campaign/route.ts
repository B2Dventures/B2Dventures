import prisma from "@/utils/db";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get('sort');
    const campaignName = searchParams.get('name');

    let orderBy: any = {};

    if (sort === 'name') {
      orderBy = { name: 'asc' };
    }
    else if (sort === 'inverse_name') {
      orderBy = { name: 'desc' };
    }
    else if (sort === 'min_invest') {
      orderBy = { min_invest: 'asc' };
    }
    else if (sort === 'inverse_min_invest') {
      orderBy = { min_invest: 'desc' };
    }
    else if (sort === 'totalInvestment' || sort === 'investors') {
      orderBy = {};
    }

    const campaigns = await prisma.campaign.findMany({
      where: {
        approvalStatus: 'APPROVED',
        ...(campaignName && {
          name: {
            contains: campaignName,
            mode: 'insensitive',
          },
        }),
      },
      orderBy: sort !== 'totalInvestment' && sort !== 'investors' ? orderBy : undefined,
      include: {
        investment: true,
      },
    });

    const campaignsWithTotalInvestment = campaigns.map(campaign => {
      const totalInvestment = campaign.investment.reduce(
        (sum, inv) => sum + inv.amount.toNumber(),
        0
      );
      const investors = campaign.investment.length;
      return {
        id: campaign.id,
        name: campaign.name,
        description: campaign.description,
        images: campaign.images,
        totalInvestment,
        investors,
        min_invest: campaign.min_invest,
      };
    });

    if (sort === 'totalInvestment') {
      campaignsWithTotalInvestment.sort((a, b) => b.totalInvestment - a.totalInvestment);
    } else if (sort === 'investors') {
      campaignsWithTotalInvestment.sort((a, b) => b.investors - a.investors);
    }

    return NextResponse.json({ campaigns: campaignsWithTotalInvestment });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
  }
}
