/*
  Warnings:

  - You are about to drop the column `investmentId` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the `BusinessRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Description` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvestorRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `approvalStatus` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approvalStatus` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approvalStatus` to the `Investment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approvalStatus` to the `Investor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BusinessRequest" DROP CONSTRAINT "BusinessRequest_requestId_fkey";

-- DropForeignKey
ALTER TABLE "Description" DROP CONSTRAINT "Description_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "InvestorRequest" DROP CONSTRAINT "InvestorRequest_requestId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_userId_fkey";

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "approvalStatus" "RequestStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "investmentId",
ADD COLUMN     "approvalStatus" "RequestStatus" NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "approvalStatus" "RequestStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Investor" ADD COLUMN     "approvalStatus" "RequestStatus" NOT NULL;

-- DropTable
DROP TABLE "BusinessRequest";

-- DropTable
DROP TABLE "Description";

-- DropTable
DROP TABLE "InvestorRequest";

-- DropTable
DROP TABLE "Request";

-- DropEnum
DROP TYPE "RequestType";

-- CreateTable
CREATE TABLE "Detail" (
    "id" SERIAL NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "highlight" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "opportunity" TEXT NOT NULL,

    CONSTRAINT "Detail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Detail_campaignId_key" ON "Detail"("campaignId");

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
