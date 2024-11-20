// Keep all interface Data

// POST api/business
import {Detail} from "@prisma/client";

export interface CampaignData {
    id: number;
    name: string;
    goal: number;
    raised: number;
    investors: number;
    status: string;
}

// GET api/request
export interface RequestData {
    id: number;
    campaignId : number;
    firstName: string;
    lastName: string;
    income: number;
    email: string;
}

// GET /api/admin/investment

export interface adminInvestment {
    id: number;
    amount: number;
    investorFirstName: string;
    investorLastName: string;
    investorIncome: number;
    investorPhone: string;
    investorEmail: string;
    businessName: string;
    businessOwnerEmail: string;
}

export interface Business {
    id: number;
    name: string;
    description: string;
    image: string;
    totalInvestment: number;
    investors: number;
    min_invest: number;
}

export interface Campaign {
    id: number; // Assuming ID is a string, adjust if it's a number
    name: string;
    description: string;
    images: string[]; // Assuming images is an array of strings (URLs or file paths)
    goal: number;
    raisedAmount: number;
    daysLeft: number;
    investors: number;
    min_invest: number;
    start_date: string | Date; // Adjust type if you're using Date objects
    end_date: string | Date;   // Adjust type if you're using Date objects
    highlights: string ;
    product: string;
    opportunity: string;
    approvalStatus: string;
}

export interface InvestmentQuery {
    campaignId: number;  // Assuming these are received as strings
    amount: number;
}
