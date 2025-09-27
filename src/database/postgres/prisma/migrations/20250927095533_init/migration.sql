-- DropForeignKey
ALTER TABLE "public"."Community" DROP CONSTRAINT "Community_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Community" ADD CONSTRAINT "Community_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
