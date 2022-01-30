import request from 'supertest'
import { app } from '../../app'

it('returns the details of the current user on success', async () => {
  const signupRes = await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(201);

	const cookie = signupRes.get('Set-Cookie')
	
	
	const response = await request(app)
    .get('/api/users/currentuser')
		.set('Cookie', cookie)
		.expect(200)
	expect(response.body.currentUser.email).toEqual('test@test.com')
});