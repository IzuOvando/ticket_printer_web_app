const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Inserting data into the database...");
  await prisma.user.create({
    data: {
      username: "Ruben35",
      password:
        "441a0e91023c4658951e9ec6a3343b1639cd98d520aa5c8e2c84b0d64152a133",
    },
  });

  await prisma.user.create({
    data: {
      username: "JuanOvando",
      password:
        "d76b823f60f2c47f8117792a4ab439f879c30873ba56ce103de7c923418d76ad",
    },
  });

  console.log("Succesfully inserted users into the database!");
}

main()
  .catch((e) => {
    if (e.code === "P2002") {
      console.log("The data already exists, skipping creation");
      process.exit(0);
    }
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
