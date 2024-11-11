-- CreateTable
CREATE TABLE "DetailRequest" (
    "id" SERIAL NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "investorId" INTEGER NOT NULL,
    "approvalStatus" "RequestStatus" NOT NULL,

    CONSTRAINT "DetailRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DetailRequest" ADD CONSTRAINT "DetailRequest_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailRequest" ADD CONSTRAINT "DetailRequest_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
