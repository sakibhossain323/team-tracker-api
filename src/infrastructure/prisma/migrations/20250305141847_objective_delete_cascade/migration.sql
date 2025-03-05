-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_objectiveId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "Objective"("id") ON DELETE CASCADE ON UPDATE CASCADE;
