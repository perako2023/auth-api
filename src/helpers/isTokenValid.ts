import 'dotenv/config'
import jwt from 'jsonwebtoken'

export default function isTokenValid(token: string) {
	return !!jwt.verify(token, process.env.JWT_SECRET!)
}
