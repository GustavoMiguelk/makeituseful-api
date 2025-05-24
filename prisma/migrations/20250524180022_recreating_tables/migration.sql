/*
  Warnings:

  - You are about to drop the column `user` on the `corporations` table. All the data in the column will be lost.
  - You are about to drop the column `Useradress` on the `products` table. All the data in the column will be lost.
  - Added the required column `user_adress` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "corporations" DROP COLUMN "user",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'corporation';

-- AlterTable
ALTER TABLE "products" DROP COLUMN "Useradress",
ADD COLUMN     "user_adress" TEXT NOT NULL;
