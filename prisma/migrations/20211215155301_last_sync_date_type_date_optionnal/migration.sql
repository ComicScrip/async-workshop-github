/*
  Warnings:

  - You are about to alter the column `repos_last_sync_date` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `repos_last_sync_date` DATETIME(3) NULL;
