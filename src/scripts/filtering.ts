import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getFilteredVouchers(filters: { empresa?: string, material?: string, volumen?: string }) {
  const conditions = {
    ...(filters.empresa && { empresa: filters.empresa }),
    ...(filters.material && { material: filters.material }),
    ...(filters.volumen && { volumen: filters.volumen })
  };

  const filteredVouchers = await prisma.user.findMany({
    where: conditions
  });
  console.log(filteredVouchers);
}

getFilteredVouchers({ material: 'Acero', empresa: 'EmpresaX' });
getFilteredVouchers({ empresa: 'EmpresaY' });
