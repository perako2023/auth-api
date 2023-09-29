import express from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export default async function logout(req: express.Request, res: express.Response) {
	try {
		const { token } = req.cookies
		if (!token) return res.sendStatus(401)

		const isTokenValid = jwt.verify(token, process.env.JWT_SECRET!)
		if (!isTokenValid) return res.sendStatus(401)

		res.clearCookie('token')

		return res.sendStatus(200)
	} catch (error) {
		console.error('Logout error: ', error)

		return res.sendStatus(400)
	}
}
