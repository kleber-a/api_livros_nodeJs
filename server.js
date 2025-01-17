import "dotenv/config"
import app from "./src/app.js";

const PORT = 3000

// app.listen(PORT, () => {
//     console.log('servidor escutando!');
// });

if (process.env.VERCEL === undefined) {
    // Rodando localmente
    app.listen(PORT, () => {
      console.log(`Servidor escutando na porta ${PORT}`);
    });
  }
  
  // Exporte como função para Vercel
  export default function (req, res) {
    app(req, res);
  }