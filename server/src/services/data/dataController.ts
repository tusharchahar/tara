import { NextFunction, Request, Response } from 'express';
import  User  from '../../models/user.model';
import  Hobby from '../../models/hobby.model';
import  College from '../../models/college.model';

export const addData= async (req: Request, res: Response, next: NextFunction) => {
    if ((req as any).user.payload.id != req.body.parent_id) {
		return res
			.status(401)
			.send({ error: 'You can can only access yourself' });
	}
    await User.findById(req.body.parent_id)
		.then((user: any | null) => {
			if (!user) {
				return user;
			}

			Object.assign(user, {filledData:true});
			return user.save();
		})
    const hobby=await Hobby.create({
        user_id:req.body.parent_id,
        hobby:req.body.hobby
    })
    await hobby.save();
    const college=await College.create({
        user_id:req.body.parent_id,
        college:req.body.college
    })
    await college.save();

    res.status(200).send({ message: 'success' });
}

export const getData= async (req: Request, res: Response, next: NextFunction) => {
    // console.log((req as any).user.payload.id,req.params.userId);
	if ((req as any).user.payload.id != req.params.userId) {
		return res
			.status(401)
			.send({ error: 'You can can only access yourself' });
	}
    const whereClause = req.params && req.params.userId ? { where: { user_id: req.query.userId }, } : undefined;
    let hobb = await Hobby.find({whereClause}).then((user:any|null)=>{return user});
    let colleg = await College.find({whereClause}).then((user:any|null)=>{return user});

    let response = [{
        hobby:hobb[0].hobby,
        college:colleg[0].college
    }];
    //console.log(response);
     return res.json(response);
}

export const updateData = async (req: Request, res: Response, next: NextFunction) => {

	if ((req as any).user.payload.id != req.params.userId) {
		return res
			.status(401)
			.send({ error: 'You can can only access yourself' });
	}
    const whereClause = req.params && req.params.userId ? { where: { user_id: req.query.userId }, } : undefined;
    await Hobby.find({whereClause})
		.then((user: any | null) => {
			if (!user[0]) {
				return user[0];
			}
			Object.assign(user[0], {hobby:req.body.hobby});
			return user[0].save();
	})
    await College.find({whereClause})
		.then((user: any | null) => {
			if (!user[0]) {
				return user[0];
			}
			Object.assign(user[0], {college:req.body.college});
			return user[0].save();
	})
    return res.json('success');
};

