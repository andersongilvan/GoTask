/*
  Warnings:

  - The `status` column on the `task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priority` column on the `task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `user_role` on the `users` table. All the data in the column will be lost.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
DROP COLUMN "priority",
ADD COLUMN     "priority" TEXT NOT NULL DEFAULT 'medium';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_role",
ADD COLUMN     "role" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TaskPriority";

-- DropEnum
DROP TYPE "TaskStatus";

-- DropEnum
DROP TYPE "UserRole";
