const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./src/routes/routes');

app.route('/', router);
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});