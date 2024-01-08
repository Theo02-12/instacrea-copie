import connectMongoDB from '@/app/lib/mongodb';
import UserModel from '@/app/models/userModel';
import { NewUserRequest } from '@/app/types';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
	const body = (await req.json()) as NewUserRequest;
	await connectMongoDB();
	const newUser = await UserModel.create({
		...body,
	});

	return NextResponse.json(newUser);
};
