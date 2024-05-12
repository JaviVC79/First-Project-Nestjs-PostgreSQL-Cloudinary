/*
  Warnings:

  - A unique constraint covering the columns `[name,userEmail]` on the table `Tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tasks_name_userEmail_key" ON "Tasks"("name", "userEmail");
