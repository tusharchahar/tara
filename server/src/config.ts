/**
 * config variables.
 */
export const config = {
	algorithms: ['HS256' as const],
	secret: 'ABCDEF',
	HOST: "localhost",
	USER: "mongodb",
	PASSWORD: "Yourmongopassword",
	DB: "tara-capital",
	
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
}
