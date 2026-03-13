const express = require("express")
const products = require("./data")
const cors = require('cors')
const app = express()


const port = 3000;

const corsOptions = {
  origin: ['http://localhost:5173'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: 'GET, POST, PUT, PATCH, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}



app.use(express.json())
app.use(cors(corsOptions))
app.get("/api/products", (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 3;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = products.slice(startIndex, endIndex);
  
    res.json({
        page,
        limit,
        total: products.length,
        data: paginatedProducts
    });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}, url: http://localhost:${port}`);
})
