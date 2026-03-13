const express = require("express")
const blogs = require("./data")
const cors = require('cors')
const app = express()
const port = 8080;



const corsOptions = {
    origin: ['http://localhost:5173'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: 'GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
}

app.use(express.json())
app.use(cors(corsOptions))

app.get("/api/blogs", (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 3;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedBlogs = blogs.slice(startIndex, endIndex);
    res.json({
        page,
        limit,
        total: blogs.length,
        data: paginatedBlogs
    })
})


app.get('/api/blogs/:id',(req,res)=>{
    try {
        const{id}=req.params
        const blog=blogs.find((blog)=>blog.id===id)
        if(!blog){
            return res.status(404).json({
                data:null,
                message:'Blog tapilmadi'
            })
        }
        res.status(200).json({
            data:blog,
            message:'Blog ugurla getirildi',
            success:true,
            error:null
        })
        
    } catch (error) {
        res.status(500).json({
            data:null,
            message:'Xeta bash verdi',
            success:false,
        
            error:error.message
        })
    }
})


app.delete('/api/blogs/:id',(req,res)=>{
    try {
        const{id}=req.params
        const idx=blogs.findIndex((blog)=>blog.id===id)
        if(idx===-1){
            return res.status(404).json({message:'blog tapilmadi'})

        }
        const deleteBlog=blogs.splice(idx,1)
        res.status(200).json({
            message:'Blog uqurla silindi',
            data:deleteBlog[0],
            updatedBlogs:blogs
        })
    }catch (error) {
        res.status(500).json({
            message:'Xeta bash verdi',
            error:error.message
        })
    }
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}, url: http://localhost:${port}`);
})
