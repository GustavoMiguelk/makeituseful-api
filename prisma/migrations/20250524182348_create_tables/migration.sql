/*
  Warnings:

  - The values [OPEN] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('OPEN', 'SELECTED');

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PENDING', 'ACCEPTED', 'COLLECTED');
ALTER TABLE "collect" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "collect" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "collect" ALTER COLUMN "status" SET DEFAULT 'ACCEPTED';
COMMIT;

-- AlterTable
ALTER TABLE "collect" ALTER COLUMN "status" SET DEFAULT 'ACCEPTED';

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'OPEN';
