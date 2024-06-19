import { PrismaClient } from "@prisma/client";
import { createSeedClient } from "@snaplet/seed";
import * as seederData from "./seeder";

const prisma = new PrismaClient()
const seed = await createSeedClient();

async function main() {
  await seed.$resetDatabase();

  await prisma.roleUser.createMany({ data: seederData.role, skipDuplicates: true });

  await prisma.user.createMany({ data: seederData.users, skipDuplicates: true });
  await prisma.campus.createMany({ data: seederData.campuses, skipDuplicates: true });
  await prisma.variable.createMany({ data: seederData.variables, skipDuplicates: true });
  await prisma.formGroup.createMany({ data: seederData.formGroups, skipDuplicates: true });
  await prisma.roleOnFormGroup.createMany({ data: seederData.roleOnFormGroup, skipDuplicates: true });
  await prisma.variableOnFormGroup.createMany({
    data: seederData.variableOnFormGroups,
    skipDuplicates: true
  });
  await prisma.question.createMany({ data: seederData.questions, skipDuplicates: true });
  await prisma.option.createMany({ data: seederData.options, skipDuplicates: true });
  await prisma.answer.createMany({ data: seederData.answers, skipDuplicates: true });
  await prisma.levelIndex.createMany({ data: seederData.levelIndices, skipDuplicates: true });
  await prisma.levelIndexOnVariables.createMany({
    data: seederData.levelIndexOnVariables,
    skipDuplicates: true
  });
  await prisma.campusSurveyLog.createMany({
    data: seederData.campusSurveyLog,
    skipDuplicates: true
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
