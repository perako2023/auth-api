import express from 'express'
import { UserModel } from '../../models/user.model'
import { hashPassword, isEmailValid, signUserWithJwt } from '../../helpers/auth.helper'
import { TOKEN_NAME } from '../../const'

export default async function registerController(req: express.Request, res: express.Response) {
	try {
		const { email, password, username } = req.body

		if (!username) return res.status(401).json({ error: 'Username is required' })
		if (!email) return res.status(401).json({ error: 'Email is required' })
		if (!password) return res.status(401).json({ error: 'Password is required' })

		if (!isEmailValid(email)) return res.status(401).json({ error: 'Invalid email' })

		const existingUser = await UserModel.findOne({ email })
		if (existingUser) return res.status(401).json({ error: 'Email is already taken' })

		const hashedPassword = await hashPassword(password)

		const newUser = await UserModel.create({
			username,
			email,
			password: hashedPassword
		})

		const token = signUserWithJwt(newUser)
		res.cookie(TOKEN_NAME, token)

		//@ts-expect-error
		newUser.password = undefined
		return res.status(200).json(newUser)
	} catch (error) {
		console.error(`Registration error: ${error}`)

		return res.sendStatus(400)
	}
}
