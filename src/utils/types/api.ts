// Keep all respond data

// POST api/business
export interface CampaignData {
    id: string;
    name: string;
    goal: number;
    raised: number;
    investors: number;
    status: string;
}

// GET api/request
export interface RequestData {
    id: string;
    campaignId : number;
    firstName: string;
    lastName: string;
    income: number;
    email: string;
}

// GET api/admin/investment
export interface adminInvestment {
    id: string;
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
    id: string;
    name: string;
    description: string;
    images: string[] | string;
    totalInvestment: number;
    investors: number;
    min_invest: number;
}

// GET api/campaign/[id]
export interface Campaign {
    id: string; // Assuming ID is a string, adjust if it's a number
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
    stockPrice: number;
}

// GET api/search
export interface Investment {
    id: string;
    name: string;
    description: string;
    images: string[];
    totalInvestment: number;
    investors: number;
}

//  GET api/admin/investment/[id]
export interface adminInvestmentDetail {
    id: string;
    amount: number;
    timestamp: Date;
    approvalStatus: string;
    investorFirstName: string;
    investorLastName: string;
    investorPhone: string;
    investorPassportNum: string;
    campaignName: string;
    campaignDescription: string;
    businessName: string;
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
    id: string;
    name: string;
    image: string;
    totalInvestors: number;

}

// GET api/admin/investor
export interface adminInvestor {
    id: string;
    first_name: string;
    last_name: string;
    nationality: string;
    passport_num: string;
    birth_date: Date;
    address: string;
    occupation: string;
    income: number;
    passport_img: string;
    approvalStatus: string;
    user: {
        email: string;
    };
}

// GET api/admin/investor/[id]
export interface adminInvestorDetail {
    id: string;
    first_name: string;
    last_name: string;
    nationality: string;
    passport_num: string;
    phone_num: string;
    birth_date: Date;
    address: string;
    occupation: string;
    income: number;
    passport_img: string;
    approvalStatus: string;
    user: {
        id: string;
        email: string;
        clerkId: string;
    };}

// GET api/admin/campaign
export interface adminCampaign {
    id: string;
    name: string;
    description: string;
    goal: number;
    minInvest: number;
    startDate: Date;
    endDate: Date;
    images: string[];
    industry: string[];
    approvalStatus: string;
    businessName: string;
    highlights: string;
}

// GET api/admin/business
export interface adminBusiness {
    id: string;
    business_name: string;
    founder_first_name: string;
    founder_last_name: string;
    market_cap: number;
    company_address: string;
    business_detail: string;
    industry: string[];
    logo: string;
    license: string;
    approvalStatus: string;
    userEmail: string;
}

//  GET api/admin/business/[id]
export interface adminBusinessDetail {
    id: string;
    business_name: string;
    founder_first_name: string;
    founder_last_name: string;
    market_cap: number;
    company_address: string;
    business_detail: string;
    industry: string[];
    logo: string;
    license: string;
    approvalStatus: string;
    userId: string;
    userEmail: string;
}