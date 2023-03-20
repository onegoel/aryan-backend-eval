const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const router = require('./src/routes/routes');

app.use('/api', router);
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});