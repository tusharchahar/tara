import { NextFunction, Request, Response } from 'express';

import  User  from '../../models/user.model';

export const find = async (req: Request, res: Response, next: NextFunction) => {

	const whereClause = req.query && req.query.publicAddress ? { where: { publicAddress: req.query.publicAddress }, } : undefined;
	//const whereClause={};
	return await User.find({whereClause})
		.then((users: any) => res.json(users))
		.catch(next);
};

export const get = (req: Request, res: Response, next: NextFunction) => {

	if ((req as any).user.payload.id != req.params.userId) {
		return res
			.status(401)
			.send({ error: 'You can can only access yourself' });
	}
	return User.findById(req.params.userId)
		.then((user: any | null) => res.json(user))
		.catch(next);
};

export const create = (req: Request, res: Response, next: NextFunction) => {
	req.body.nonce = Math.floor(Math.random() * 10000);
	User.create(req.body)
		.then((user: any) => res.json(user))
		.catch(next);
}


export const patch = (req: Request, res: Response, next: NextFunction) => {

	if ((req as any).user.payload.id != req.params.userId) {
		return res
			.status(401)
			.send({ error: 'You can can only access yourself' });
	}
	return User.findById(req.params.userId)
		.then((user: any | null) => {
			if (!user) {
				return user;
			}

			Object.assign(user, req.body);
			return user.save();
		})
		.then((user: any | null) => {
			return user
				? res.json(user)
				: res.status(401).send({
					error: `User with publicAddress ${req.params.userId} is not found`,
				});
		})
		.catch(next);
};
