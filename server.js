import "dotenv/config"
import app from "./src/app.js";

const PORT = 3000

app.listen(PORT, () => {
    console.log('servidor escutando!');
});

app.get('/', (req, res) => {
    res.send('Nossa API está funcionando!')
})

app.get('/test', (req, res) => {
    res.send('Você entrou no test')
})