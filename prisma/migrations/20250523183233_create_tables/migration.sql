/*
  Warnings:

  - You are about to drop the column `user` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "user",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'customer';
