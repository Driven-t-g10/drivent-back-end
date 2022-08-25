-- AlterTable
ALTER TABLE "UserTicket" ALTER COLUMN "hasHotel" DROP NOT NULL,
ALTER COLUMN "hasHotel" SET DEFAULT false;
