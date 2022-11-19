require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

// mongoose connection setting, database URL is in .env
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.error('Connected to database'))


// routes

// hadcrut
const hadcrutGlobalMonthlyRouter = require('./routes/hadcrut/hadcrut_global_monthly_Route')
app.use('/hadcrutglobalmonthly', hadcrutGlobalMonthlyRouter)

const hadcrutGlobalAnnualRouter = require('./routes/hadcrut/hadcrut_global_annual_Route')
app.use('/hadcrutglobalannual', hadcrutGlobalAnnualRouter)

const hadcrutNorthernHemisphereMonthlyRouter = require('./routes/hadcrut/hadcrut_northern_hemisphere_monthly_Route')
app.use('/hadcrutnorthernhemispheremonthly', hadcrutNorthernHemisphereMonthlyRouter)

const hadcrutNorthernHemisphereAnnualRouter = require('./routes/hadcrut/hadcrut_northern_hemisphere_annual_Route')
app.use('/hadcrutnorthernhemisphereannual', hadcrutNorthernHemisphereAnnualRouter)

const hadcrutSouthernHemisphereMonthlyRouter = require('./routes/hadcrut/hadcrut_southern_hemisphere_monthly_Route')
app.use('/hadcrutsouthernhemispheremonthly', hadcrutSouthernHemisphereMonthlyRouter)

const hadcrutSouthernHemisphereAnnualRouter = require('./routes/hadcrut/hadcrut_southern_hemisphere_annual_Route')
app.use('/hadcrutsouthernhemisphereannual', hadcrutSouthernHemisphereAnnualRouter)

// northern hemisphere temperature reconstruction
const northernHemisphereTemperatureReconstructionRouter = require('./routes/northern_hemisphere_temperature_reconstruction/northern_hemisphere_temperature_reconstruction_Route')
app.use('/northerntempreconstruction', northernHemisphereTemperatureReconstructionRouter)

// mauna loa co2
const maunaLoaCO2AnnualRouter = require('./routes/mauna_loa_co2/mauna_loa_co2_annual_Route')
app.use('/maunaloaco2annual', maunaLoaCO2AnnualRouter)

const maunaLoaCO2MonthlyRouter = require('./routes/mauna_loa_co2/mauna_loa_co2_monthly_Route')
app.use('/maunaloaco2monthly', maunaLoaCO2MonthlyRouter)

// vostok ice core co2
const vostokIceCoreCO2Router = require('./routes/vostok_ice_core_co2/vostok_ice_core_co2_Route')
app.use('/vostokicecoreco2', vostokIceCoreCO2Router)

// ice core 800kyr co2 composite
const iceCore800kYearCompositeCO2Router = require('./routes/ice_core_800k_year_co2/ice_core_800k_year_co2_Route')
app.use('/icecore800kco2', iceCore800kYearCompositeCO2Router)

// snyder temperature evolution 
const snyderRouter = require('./routes/snyder_temperature_evolution/snyder_temperature_evolution_Route')
app.use('/snyder_temperature_evolution', snyderRouter)

app.listen(3001, () => console.log('Server started'))