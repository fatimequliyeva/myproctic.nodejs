const express = require('express')
const { nanoid } = require('nanoid')  //uniq id
const cors = require('cors')
const tours = require('./data')

const app = express()
const port = 3000  //portum

// CORS
const corsOptions = {  //toqqusmanin qarsini alir frontla 
  origin: 'http://localhost:5174',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(express.json())  //json formatinda qaytasrsin
app.use(cors(corsOptions))  //corsu caqrmisam


app.get('/api/tours', (req, res) => {  //get req gelende isleyecek
  try {
    const { search = '', sort, order = 'asc' } = req.query  //url querlireini goturur

    let result = [...tours]  //esas massivden kopya gotuur org eriiyi daqdmamaq ucun

   
    if (search) {  //eger axdaris varsa server ise dusecek
      result = result.filter((tour) =>  //turun title ve descda axdaris edir ve boyuk kck herfe hessas deyil
        tour.title.toLowerCase().includes(search.toLowerCase()) ||
        tour.description.toLowerCase().includes(search.toLowerCase())
      )
    }

   
    if (sort) {  //sirlama hussesi 
      result.sort((a, b) => {  //erreyi sirlayar 
        if (typeof a[sort] === 'string') { //desc tersine asc a dan zye sirlma edir herfler arasinda 
          return order === 'desc'
            ? b[sort].localeCompare(a[sort])
            : a[sort].localeCompare(b[sort])
        }

        if (typeof a[sort] === 'number') {  //yox eger gelen reqemdise coxdan aza azdan coxa 
          return order === 'desc'
            ? b[sort] - a[sort]
            : a[sort] - b[sort]
        }

        return 0
      })
    }

    res.status(200).json({  //succes formatindfa cavabda verior 
      data: result,
      success: true,
      message: 'Turlar uğurla tapıldı',
    })
  } catch (error) {  //buda errorumzdu 
    res.status(500).json({
      success: false,
      message: 'Server xətası',
      error: error.message,
    })
  }
})



app.get('/api/tours/:id', (req, res) => {  //idsne gore caqemadqdi 
  try {
    const { id } = req.params  //idni tuturuq 
    const tour = tours.find((tour) => tour.id === id) //gonderdym idli turu tapir 

    if (!tour) {
      return res.status(404).json({  //tapilmazsa bu 
        data: null,
        success: false,
        message: 'Tur tapılmadı',
      })
    }

    res.status(200).json({  //tapilarsa bu gelecek 
      data: tour, 
      success: true,
      message: 'Tur uğurla tapıldı',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server xətası',
      error: error.message,
    })
  }
})


app.post('/api/tours', (req, res) => { //yeni tur elave edir 
  try {  //frontdan gelen melumati goturur 
    const {
      title,
      destination,
      price,
      discountPrice,
      description,
      startDate,
      endDate,
      duration,
      capacity,
    } = req.body

    if (  //eger vacb melumarlat bosduasa 
      !title ||
      !destination ||
      !price ||
      !description ||
      !startDate ||
      !endDate ||
      !duration ||
      !capacity
    ) {
      return res.status(400).json({  //bu mesaji vereceke 
        success: false,
        message: 'Bütün məlumatlar tələb olunur',
      })
    }

    const newTour = {
      id: nanoid(4),
      title,
      destination,
      price,
      discountPrice,
      description,
      startDate,
      endDate,
      duration,
      capacity,
    }

    tours.push(newTour)  //okeydise yeni tur yaradir 

    res.status(201).json({
      success: true,
      message: 'Tur uğurla yaradıldı',
      data: newTour,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server xətası',
      error: error.message,
    })
  }
})



app.delete('/api/tours/:id', (req, res) => {
  try {
    const { id } = req.params
    const index = tours.findIndex((tour) => tour.id === id)

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Tur tapılmadı',
      })
    }

    const deletedTour = tours.splice(index, 1)

    res.status(200).json({
      success: true,
      message: 'Tur uğurla silindi',
      data: deletedTour[0],
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server xətası',
      error: error.message,
    })
  }
})



app.listen(port, () => {  //serveri ise salir 
  console.log(`Server işləyir: http://localhost:${port}`)
})