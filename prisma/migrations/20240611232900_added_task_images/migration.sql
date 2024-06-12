-- CreateTable
CREATE TABLE "TasksImage" (
    "id" TEXT NOT NULL,
    "secure_url" TEXT NOT NULL,

    CONSTRAINT "TasksImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TasksImage_id_key" ON "TasksImage"("id");
