import express from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../../models/user.model'

/** Controller to get user data */
export default async function getUserDataController(req: express.Request, res: express.Response) {
	try {
		const { token } = req.cookies

		if (!token) return res.sendStatus(401)

		// @ts-expect-error
		const { email } = jwt.verify(token, process.env.JWT_SECRET!)

		const user = await UserModel.findOne({ email })

		if (!user) return res.sendStatus(401)

		return res.status(200).json(user)
	} catch (error) {
		console.error('getUser error: ', error)

		return res.sendStatus(400)
	}
}
