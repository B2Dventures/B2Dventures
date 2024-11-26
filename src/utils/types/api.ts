// Keep all respond data

// POST api/business
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

// GET api/admin/investment
export interface adminInvestment {
    id: number;
    amount: number;
    timestamp: Date;
    investorFirstName: string;
    investorLastName: string;
    investorIncome: number;
    investorPhone: string;
    investorEmail: string;
    businessName: string;
    businessOwnerEmail: string;
    campaignName: string;
}

// GET  api/campaign?sort=_&campaignName=_
export interface Business {
    id: number;
    name: string;
    description: string;
    images: string[] | string;
    totalInvestment: number;
    investors: number;
    min_invest: number;
}

// GET api/campaign?id=_
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
    industry: string[];
}

// GET api/search
export interface Investment {
    id: number;
    name: string;
    description: string;
    images: string[];
    totalInvestment: number;
    investors: number;
}

// GET api/investment/
export interface InvestmentDashboard {
    campaign: {
        name: string;
    };
    amount: number;
    timestamp: Date;
    approvalStatus: string;
}

// GET api/campaigns/slide
export interface Slide {
    id: number;
    name: string;
    image: string;
    totalInvestors: number;

}

//