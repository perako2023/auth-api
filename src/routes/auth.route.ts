import express from 'express'
import login from '../controllers/auth/login.controller'
import register from '../controllers/auth/register.controller'
import getUserData from '../controllers/auth/get-user-data.controller'
import logout from '../controllers/auth/logout.controller'

export default (router: express.Router) => {
	router.post('/api/auth/register', register)
	router.post('/api/auth/login', login)
	router.get('/api/auth/user', getUserData)
	router.get('/api/auth/logout', logout)
}
