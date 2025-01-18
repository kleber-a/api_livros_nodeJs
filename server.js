import "dotenv/config"
import app from "./src/app.js";

// const PORT = 3000

// app.listen(PORT, () => {
//     console.log('servidor escutando!');
// });

// if (process.env.VERCEL === undefined) {
//     // Rodando localmente
//     app.listen(PORT, () => {
//       console.log(`Servidor escutando na porta ${PORT}`);
//     });
//   }
  
  // Exporte como função para Vercel
  // const PORT = process.env.PORT || 3000;
  // app.listen(PORT, () => {
  //   console.log(`Server is running on port ${PORT}`);
  // });

  const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('API funcionando corretamente!');
});

app.get('/livros', (req, res) => {
  res.status(200).send("livros")
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});