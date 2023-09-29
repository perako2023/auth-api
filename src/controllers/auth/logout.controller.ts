import express from 'express'
import 'dotenv/config'
import isTokenValid from '../../helpers/isTokenValid'

export default async function logout(req: express.Request, res: express.Response) {
	try {
		const { token } = req.cookies
		if (!token) return res.sendStatus(401)

		if (isTokenValid(token) === false) return res.sendStatus(401)

		res.clearCookie('token')

		return res.sendStatus(200)
	} catch (error) {
		console.error('Logout error: ', error)

		return res.sendStatus(400)
	}
}
