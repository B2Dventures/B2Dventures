// Payload from POST api/investment
export interface InvestmentQuery {
    campaignId: number;  // Assuming these are received as strings
    amount: number;
}

// Payload from POST api/enroll/investor
export interface enrollInvestorQuery {
    firstName: string;
    lastName: string;
    nationality: string;
    passportNumber: string;
    phoneNumber: string;
    birthDate: string;
    address: string;
    occupation: string;
    income: number;
    passportImg: string;
}

// Payload from POST api/enroll/business
export interface enrollBusinessQuery {
    businessName: string;
    founderFirstName: string;
    founderLastName: string;
    marketCap : number;
    companyAddress: string;
    businessDetail: string;
    industry: string[];
    logo: string;
    license: string;
}

// Payload from POST api/campaign/createFund
export interface createFundQuery {
    title: string;
    description: string;
    goal: number;
    minimumInvest: number;
    category: string[];
    startDate: Date
    endDate: Date;
    highlight: string;
    product: string;
    opportunity: string;
    images : string[];
}