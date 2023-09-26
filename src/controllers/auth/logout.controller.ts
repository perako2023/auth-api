import express from 'express'

export default async function logout(req: express.Request, res: express.Response) {
	try {
		res.clearCookie('token')

		return res.sendStatus(200)
	} catch (error) {
		console.error('Logout error: ', error)

		return res.sendStatus(400)
	}
}
