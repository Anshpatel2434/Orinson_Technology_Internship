/*
  Warnings:

  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Task";

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
