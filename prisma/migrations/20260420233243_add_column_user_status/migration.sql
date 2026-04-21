-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ENABLED', 'DISABLED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "user_status" "UserStatus" NOT NULL DEFAULT 'ENABLED';
