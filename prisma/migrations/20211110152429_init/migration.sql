-- CreateTable
CREATE TABLE "Set" (
    "id" SERIAL NOT NULL,
    "members" INTEGER[],

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" SERIAL NOT NULL,
    "member" INTEGER NOT NULL,
    "containiningSetID" INTEGER NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);
