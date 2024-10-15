-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Investor', 'Business', 'Admin');

-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('INVESTOR', 'BUSINESS');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "role" "Role",
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investor" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "passport_num" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "income" INTEGER NOT NULL,
    "passport_img" TEXT NOT NULL,

    CONSTRAINT "Investor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "business_name" TEXT NOT NULL,
    "founder_first_name" TEXT NOT NULL,
    "founder_last_name" TEXT NOT NULL,
    "market_cap" INTEGER NOT NULL,
    "company_address" TEXT NOT NULL,
    "business_detail" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "registration_cer" TEXT NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" "RequestType" NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorRequest" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "passport_num" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "income" INTEGER NOT NULL,
    "passport_img" TEXT NOT NULL,

    CONSTRAINT "InvestorRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessRequest" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "business_name" TEXT NOT NULL,
    "founder_first_name" TEXT NOT NULL,
    "founder_last_name" TEXT NOT NULL,
    "market_cap" INTEGER NOT NULL,
    "company_address" TEXT NOT NULL,
    "business_detail" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "registration_cer" TEXT NOT NULL,

    CONSTRAINT "BusinessRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Description" (
    "id" SERIAL NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "highlight" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "opportunity" TEXT NOT NULL,

    CONSTRAINT "Description_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" SERIAL NOT NULL,
    "businessId" INTEGER NOT NULL,
    "investmentId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "goal" DECIMAL(65,30) NOT NULL,
    "min_invest" DECIMAL(65,30) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investment" (
    "id" SERIAL NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "investorId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "timestamp" TIMESTAMPTZ(2) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_userId_key" ON "Investor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Business_userId_key" ON "Business"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Business_business_name_key" ON "Business"("business_name");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestorRequest_requestId_key" ON "InvestorRequest"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessRequest_requestId_key" ON "BusinessRequest"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessRequest_business_name_key" ON "BusinessRequest"("business_name");

-- CreateIndex
CREATE UNIQUE INDEX "Description_campaignId_key" ON "Description"("campaignId");

-- AddForeignKey
ALTER TABLE "Investor" ADD CONSTRAINT "Investor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorRequest" ADD CONSTRAINT "InvestorRequest_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessRequest" ADD CONSTRAINT "BusinessRequest_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Description" ADD CONSTRAINT "Description_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
