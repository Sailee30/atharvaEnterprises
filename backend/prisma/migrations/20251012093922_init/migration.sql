-- CreateEnum
CREATE TYPE "role" AS ENUM ('SUPER_ADMIN', 'PARTNER_ADMIN');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "datasheet_status" AS ENUM ('PENDING', 'PROCESSING', 'SENT', 'COMPLETED');

-- CreateEnum
CREATE TYPE "priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "role" NOT NULL DEFAULT 'PARTNER_ADMIN',
    "partner" VARCHAR(255),
    "status" "status" NOT NULL DEFAULT 'ACTIVE',
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "image" TEXT NOT NULL,
    "imagePublicId" VARCHAR(255),
    "specs" TEXT,
    "priceRange" VARCHAR(100),
    "partner" VARCHAR(255) NOT NULL,
    "brochure" TEXT,
    "specSheet" TEXT,
    "status" "status" NOT NULL DEFAULT 'ACTIVE',
    "mainCategory" VARCHAR(100),
    "subCategory" VARCHAR(100),
    "subSubCategory" VARCHAR(100),
    "description" TEXT,
    "specification" TEXT,
    "price" VARCHAR(50),
    "comparePrice" VARCHAR(50),
    "metadata" JSONB DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datasheets" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "company" VARCHAR(255),
    "message" TEXT,
    "status" "datasheet_status" NOT NULL DEFAULT 'PENDING',
    "priority" "priority" NOT NULL DEFAULT 'MEDIUM',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "datasheets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datasheet_products" (
    "id" TEXT NOT NULL,
    "datasheetId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "productName" VARCHAR(255) NOT NULL,

    CONSTRAINT "datasheet_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_username_key" ON "admins"("username");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE INDEX "admins_email_idx" ON "admins"("email");

-- CreateIndex
CREATE INDEX "admins_username_idx" ON "admins"("username");

-- CreateIndex
CREATE INDEX "products_title_idx" ON "products"("title");

-- CreateIndex
CREATE INDEX "products_partner_idx" ON "products"("partner");

-- CreateIndex
CREATE INDEX "products_status_idx" ON "products"("status");

-- CreateIndex
CREATE INDEX "products_mainCategory_idx" ON "products"("mainCategory");

-- CreateIndex
CREATE INDEX "products_createdAt_idx" ON "products"("createdAt");

-- CreateIndex
CREATE INDEX "datasheets_email_idx" ON "datasheets"("email");

-- CreateIndex
CREATE INDEX "datasheets_createdAt_idx" ON "datasheets"("createdAt");

-- CreateIndex
CREATE INDEX "datasheets_status_idx" ON "datasheets"("status");

-- CreateIndex
CREATE UNIQUE INDEX "datasheet_products_datasheetId_productId_key" ON "datasheet_products"("datasheetId", "productId");

-- AddForeignKey
ALTER TABLE "datasheet_products" ADD CONSTRAINT "datasheet_products_datasheetId_fkey" FOREIGN KEY ("datasheetId") REFERENCES "datasheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datasheet_products" ADD CONSTRAINT "datasheet_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
