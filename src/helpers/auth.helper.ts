import bcrypt from 'bcrypt'
import { UserModel } from '../models/user.model'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

/**
 * Hashes a password using bcrypt
 * @throws {Error} If an error occurs during the hashing process.
 */
export const hashPassword = async (password: string) => {
	try {
		const salt = await bcrypt.genSalt(12)
		const hash = await bcrypt.hash(password, salt)

		return hash
	} catch (error) {
		throw new Error(`Error hashing password: ${error}`)
	}
}

/**
 * Compares a plain text password with a hashed password using bcrypt
 * @throws {Error} If an error occurs during the comparison process.
 */
export const comparePasswords = async (password: string, hashedPassword: string) => {
	try {
		return bcrypt.compare(password, hashedPassword)
	} catch (error) {
		throw new Error(`Error comparing passwords: ${error}`)
	}
}

/**
 * Generates a JSON Web Token (JWT) for a user.
 * @returns {string} The generated JWT
 */
export const signUserWithJwt = (
	user: typeof UserModel.schema.obj & { _id: mongoose.Types.ObjectId }
) => {
	return jwt.sign(
		{ username: user.username, email: user.email, id: user._id },
		process.env.JWT_SECRET!
	)
}

export const isEmailValid = (email: string): boolean => {
	// Regular expression pattern for email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	// Check if the email matches the pattern
	return emailRegex.test(email)
}
