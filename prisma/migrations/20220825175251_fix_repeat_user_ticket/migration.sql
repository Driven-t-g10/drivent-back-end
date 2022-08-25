/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserTicket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserTicket_userId_key" ON "UserTicket"("userId");
