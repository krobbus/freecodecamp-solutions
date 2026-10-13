import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import { inputCleaner, inputValidator } from "./middleware.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect('/form')
});

app.get('/form', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public', 'form.html'));
});

app.post("/submit", inputCleaner, inputValidator, (req, res) => {
  res.send(`Username: ${req.body.username}, Comment: ${req.body.comment}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});