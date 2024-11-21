/*
  Warnings:

  - You are about to drop the column `content` on the `Campaign` table. All the data in the column will be lost.
  - Added the required column `industry` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "content",
ADD COLUMN     "industry" TEXT NOT NULL;
