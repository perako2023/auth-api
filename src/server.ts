import 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import router from './routes/index.route'

const app = express()

mongoose.Promise = Promise

try {
	mongoose.connect(process.env.MONGO_URL!).then(() => {
		console.log('Successfully connected to the database')
	})
} catch (error) {
	console.error('There was an error connecting to the database\n Error: ', error)
}

mongoose.connection.on('error', (error: Error) => {
	console.error('Something went wrong with the database\n Error: ', error)
})

app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:5173'
	})
)
app.use(express.json())
app.use('/', router())

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
