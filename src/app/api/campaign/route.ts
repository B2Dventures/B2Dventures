import { NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { Campaign } from "@/utils/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const sort = searchParams.get('sort');
  const campaignName = searchParams.get('name');

  try {
    if (id) {
      const campaign = await prisma.campaign.findUnique({
        where: { id: parseInt(id, 10) },
        include: {
          investment: true,
          details: true,
        },
      });

      if (!campaign) {
        return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
      }

      const raisedAmount = campaign.investment.reduce(
          (total, inv) => total + inv.amount.toNumber(),
          0
      );

      const today = new Date();
      const endDate = new Date(campaign.end_date);
      const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

      const investors = campaign.investment.length;

      const result: Campaign = {
        id: campaign.id,
        name: campaign.name,
        description: campaign.description,
        images: campaign.images || [],
        goal: campaign.goal.toNumber(),
        raisedAmount,
        daysLeft,
        investors,
        min_invest: campaign.min_invest.toNumber(),
        start_date: campaign.start_date,
        end_date: campaign.end_date,
        highlights: campaign.details?.highlight || "",
        product: campaign.details?.product || "",
        opportunity: campaign.details?.opportunity || "",
        approvalStatus: campaign.approvalStatus,
          industry: campaign.industry,
      };

      return NextResponse.json(result);
    } else {
      // Fetch a list of campaigns
      let orderBy: any = {};

      if (sort === 'name') {
        orderBy = { name: 'asc' };
      } else if (sort === 'inverse_name') {
        orderBy = { name: 'desc' };
      } else if (sort === 'min_invest') {
        orderBy = { min_invest: 'asc' };
      } else if (sort === 'inverse_min_invest') {
        orderBy = { min_invest: 'desc' };
      } else if (sort === 'totalInvestment' || sort === 'investors') {
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
    }
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
