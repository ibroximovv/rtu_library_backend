/*
  Warnings:

  - You are about to drop the `toRentBookHistory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `branchesId` to the `toRentBook` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "toRentBookHistory" DROP CONSTRAINT "toRentBookHistory_branchesId_fkey";

-- DropForeignKey
ALTER TABLE "toRentBookHistory" DROP CONSTRAINT "toRentBookHistory_studentsId_fkey";

-- DropForeignKey
ALTER TABLE "toRentBookHistory" DROP CONSTRAINT "toRentBookHistory_toRentBookId_fkey";

-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "numberOfBooks" INTEGER;

-- AlterTable
ALTER TABLE "toRentBook" ADD COLUMN     "branchesId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "toRentBookHistory";

-- AddForeignKey
ALTER TABLE "toRentBook" ADD CONSTRAINT "toRentBook_branchesId_fkey" FOREIGN KEY ("branchesId") REFERENCES "Branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
