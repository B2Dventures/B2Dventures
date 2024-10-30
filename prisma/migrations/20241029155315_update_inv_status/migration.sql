/*
  Warnings:

  - You are about to drop the column `investmentId` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the `BusinessRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvestorRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `approvalStatus` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approvalStatus` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approvalStatus` to the `Investment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approvalStatus` to the `Investor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_num` to the `Investor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BusinessRequest" DROP CONSTRAINT "BusinessRequest_requestId_fkey";

-- DropForeignKey
ALTER TABLE "InvestorRequest" DROP CONSTRAINT "InvestorRequest_requestId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_userId_fkey";

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "approvalStatus" "RequestStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "investmentId",
ADD COLUMN     "approvalStatus" "RequestStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "approvalStatus" "RequestStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Investor" ADD COLUMN     "approvalStatus" "RequestStatus" NOT NULL,
ADD COLUMN     "phone_num" TEXT NOT NULL;

-- DropTable
DROP TABLE "BusinessRequest";

-- DropTable
DROP TABLE "InvestorRequest";

-- DropTable
DROP TABLE "Request";

-- DropEnum
DROP TYPE "RequestType";
