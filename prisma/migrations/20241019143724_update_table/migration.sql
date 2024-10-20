/*
  Warnings:

  - You are about to drop the `Description` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Description" DROP CONSTRAINT "Description_campaignId_fkey";

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Description";

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
