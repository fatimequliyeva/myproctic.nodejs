const express = require("express");
const app = express();
const tours = require("./data");
const port = 3000;
const cors = require('cors')




const corsOptions = {
  origin: 'http://localhost:5173' ,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: 'GET, POST, PUT, PATCH, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}
app.use(cors(corsOptions))



app.get("/tours", (req, res) => {
  const { sort, order } = req.query
  let sortedTours = [...tours]
  if (sort) {
    sortedTours.sort((a, b) => {
      if (typeof a[sort] === "string") {
        return order === "desc"
          ? b[sort].localeCompare(a[sort])
          : a[sort].localeCompare(b[sort])
      }
      if (typeof a[sort] === "number") {
        return order === "asc"
          ? a[sort] - b[sort]
          : b[sort] - a[sort]
      }
      return 0
    })
  }
  res.json(sortedTours)
})



app.listen(port, () => {
  console.log(`Server ayaqdadır: http://localhost:${port}`);
});























// app.get("/tours", (req, res) => {
//   const { sort, order } = req.query;
//   let sortedTours = [...tours];

//   if (sort) {
//     sortedTours.sort((a, b) => {
//       // Ədədi sahələr üçün
//       if (typeof a[sort] === "number") {
//         return order === "desc" ? b[sort] - a[sort] : a[sort] - b[sort];
//       }
//       // String sahələr üçün
//       if (typeof a[sort] === "string") {
//         return order === "desc"
//           ? b[sort].localeCompare(a[sort])
//           : a[sort].localeCompare(b[sort]);
//       }
//       return 0;
//     });
//   }

//   res.json(sortedTours);
// });

