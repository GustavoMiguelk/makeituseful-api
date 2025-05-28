-- AlterTable
ALTER TABLE "collect" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "collect" ADD CONSTRAINT "collect_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
