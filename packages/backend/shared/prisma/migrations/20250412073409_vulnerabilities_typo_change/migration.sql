-- CreateTable
CREATE TABLE "GPTMessageHistory" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "GPTMessageHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GPTMessage" (
    "number" INTEGER NOT NULL,
    "message_history_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "GPTMessage_pkey" PRIMARY KEY ("message_history_id","number")
);

-- AddForeignKey
ALTER TABLE "GPTMessage" ADD CONSTRAINT "GPTMessage_message_history_id_fkey" FOREIGN KEY ("message_history_id") REFERENCES "GPTMessageHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
