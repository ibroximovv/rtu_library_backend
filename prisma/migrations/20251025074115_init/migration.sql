-- CreateEnum
CREATE TYPE "courseNumberEnum" AS ENUM ('COURSE1', 'COURSE2', 'COURSE3', 'COURSE4', 'COURSE5');

-- CreateEnum
CREATE TYPE "formOfEducationEnum" AS ENUM ('DAYTIME', 'EVENING', 'PARTTIME', 'ONLINE');

-- CreateEnum
CREATE TYPE "toRentBookStatusEnum" AS ENUM ('PENDING', 'RENTED', 'RETURNED', 'MUSTBERETURNED');

-- CreateEnum
CREATE TYPE "toRentBookDeadlineEnum" AS ENUM ('WEEK1', 'WEEK2', 'WEEK3', 'WEEK4', 'MONTH1', 'MONTH2', 'MONTH3');

-- CreateTable
CREATE TABLE "Branches" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Branches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "branchesId" INTEGER NOT NULL,
    "qrCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT,
    "quantity" INTEGER NOT NULL,
    "qrCode" TEXT,
    "categoryId" INTEGER NOT NULL,
    "branchesId" INTEGER NOT NULL,
    "numberOfReadings" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "courseNumber" "courseNumberEnum",
    "groupNumber" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "telegramUserName" TEXT,
    "telegramUserId" TEXT,
    "formOfEducation" "formOfEducationEnum",
    "email" TEXT,
    "qrCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "telegramUserName" TEXT,
    "telegramUserId" TEXT,
    "email" TEXT,
    "qrCode" TEXT,
    "branchesId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toRentBook" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "studentsId" INTEGER,
    "staffId" INTEGER,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "qrCode" TEXT,
    "deadline" "toRentBookDeadlineEnum" NOT NULL DEFAULT 'MONTH1',
    "status" "toRentBookStatusEnum" NOT NULL DEFAULT 'RENTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "toRentBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toRentBookHistory" (
    "id" SERIAL NOT NULL,
    "toRentBookId" INTEGER NOT NULL,
    "studentsId" INTEGER NOT NULL,
    "branchesId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "toRentBookHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Branches_name_key" ON "Branches"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Category_branchesId_idx" ON "Category"("branchesId");

-- CreateIndex
CREATE UNIQUE INDEX "Book_name_key" ON "Book"("name");

-- CreateIndex
CREATE INDEX "Book_branchesId_idx" ON "Book"("branchesId");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_fullName_key" ON "Staff"("fullName");

-- CreateIndex
CREATE INDEX "Staff_branchesId_idx" ON "Staff"("branchesId");

-- CreateIndex
CREATE INDEX "toRentBook_bookId_studentsId_staffId_idx" ON "toRentBook"("bookId", "studentsId", "staffId");

-- CreateIndex
CREATE INDEX "toRentBookHistory_toRentBookId_studentsId_branchesId_idx" ON "toRentBookHistory"("toRentBookId", "studentsId", "branchesId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_branchesId_fkey" FOREIGN KEY ("branchesId") REFERENCES "Branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_branchesId_fkey" FOREIGN KEY ("branchesId") REFERENCES "Branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_branchesId_fkey" FOREIGN KEY ("branchesId") REFERENCES "Branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "toRentBook" ADD CONSTRAINT "toRentBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "toRentBook" ADD CONSTRAINT "toRentBook_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "Students"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "toRentBook" ADD CONSTRAINT "toRentBook_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "toRentBookHistory" ADD CONSTRAINT "toRentBookHistory_toRentBookId_fkey" FOREIGN KEY ("toRentBookId") REFERENCES "toRentBook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "toRentBookHistory" ADD CONSTRAINT "toRentBookHistory_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "toRentBookHistory" ADD CONSTRAINT "toRentBookHistory_branchesId_fkey" FOREIGN KEY ("branchesId") REFERENCES "Branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
