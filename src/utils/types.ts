// Keep all interface Data

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
    netWorth: number;
    email: string;
}

// declare another data struct below