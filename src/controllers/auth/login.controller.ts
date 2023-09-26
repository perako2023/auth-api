import express from 'express'
import 'dotenv/config'
import { UserModel } from '../../models/user.model'
import { comparePasswords, signUserWithJwt } from '../../helpers/auth.helper'

export default async function loginController(req: express.Request, res: express.Response) {
	try {
		const { email, password } = req.body

		if (!email) return res.status(401).json({ error: 'Email is required' })
		if (!password) return res.status(401).json({ error: 'Password is required' })

		const user = await UserModel.findOne({ email }).select('+password')
		if (!user) return res.status(401).json({ error: 'User not found' })

		const isPasswordCorrect = await comparePasswords(password, user.password)
		if (!isPasswordCorrect) return res.status(401).json({ error: 'Password is incorrect' })

		const token = signUserWithJwt(user)
		res.cookie('token', token)

		//@ts-expect-error
		user.password = undefined
		return res.status(200).json(user)
	} catch (error) {
		console.error('Login error: ', error)

		return res.sendStatus(400)
	}
}
