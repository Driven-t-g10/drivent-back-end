/*
  Warnings:

  - You are about to drop the column `eventId` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "eventId";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "eventId";
