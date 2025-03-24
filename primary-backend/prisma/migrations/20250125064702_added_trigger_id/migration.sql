/*
  Warnings:

  - Added the required column `triggerID` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "triggerID" TEXT NOT NULL;
