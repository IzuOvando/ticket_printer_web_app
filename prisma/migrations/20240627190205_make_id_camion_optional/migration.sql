-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "volumen" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "idCamion" TEXT NOT NULL,
    "operador" TEXT NOT NULL,
    "checador" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");
