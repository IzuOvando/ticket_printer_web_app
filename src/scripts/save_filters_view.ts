// const express = require('express');
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
// const app = express();

// app.use(express.json());

// // Endpoint para guardar una nueva vista de query
// app.post('/saveQueryView', async (req, res) => {
//   const { nameFilter, filters, userId } = req.body;
//   try {
//     const queryView = await prisma.queryView.create({
//       data: {
//         nameFilter,
//         filters,
//         userId
//       }
//     });
//     res.json(queryView);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// // Endpoint para recuperar las vistas de un usuario
// app.get('/getQueryViews/:userId', async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const queryViews = await prisma.queryView.findMany({
//       where: { userId: parseInt(userId) }
//     });
//     res.json(queryViews);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });