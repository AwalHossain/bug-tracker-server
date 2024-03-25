/*
  Warnings:

  - A unique constraint covering the columns `[workspaceId,userId]` on the table `WorkspaceMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceMember_workspaceId_userId_key" ON "WorkspaceMember"("workspaceId", "userId");
