const express = require('express');
const mainRouter = express();

mainRouter.get('/', (req, res)=>{
    res.send('Server Opened')
})

module.exports = mainRouter;