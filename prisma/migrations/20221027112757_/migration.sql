-- CreateTable
CREATE TABLE "TodoItem" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,

    CONSTRAINT "TodoItem_pkey" PRIMARY KEY ("id")
);
