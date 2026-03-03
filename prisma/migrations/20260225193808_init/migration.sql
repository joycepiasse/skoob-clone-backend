/*
  Warnings:

  - You are about to drop the column `date_birth` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `date_birth`,
    ADD COLUMN `dateBirth` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_cpf_key` ON `User`(`cpf`);
