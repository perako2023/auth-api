import bcrypt from 'bcrypt'

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
