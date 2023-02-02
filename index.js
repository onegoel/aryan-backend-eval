const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./routes/routes'); 

app.route('/', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});