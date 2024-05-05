/*
  Warnings:

  - A unique constraint covering the columns `[userEmail]` on the table `Tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tasks_userEmail_key" ON "Tasks"("userEmail");
