/*
  Warnings:

  - You are about to drop the column `user_status` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_status",
ADD COLUMN     "userStatus" TEXT NOT NULL DEFAULT 'enabled';

-- DropEnum
DROP TYPE "UserStatus";
