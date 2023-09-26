import express from 'express'
import login from '../controllers/auth/login.controller'
import register from '../controllers/auth/register.controller'

export default (router: express.Router) => {
	router.post('/api/auth/register', register)
	router.post('/api/auth/login', login)
}
