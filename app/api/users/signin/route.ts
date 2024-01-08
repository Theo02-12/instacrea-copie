import connectMongoDB from '@/app/lib/mongodb';
import UserModel from '@/app/models/userModel';
import { SignInCredentials } from '@/app/types';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
	const { email, password } = (await req.json()) as SignInCredentials;
	if (!email || !password)
		return NextResponse.json({
			error: 'Demande invalide, mot de passe email manquant !',
		});

	await connectMongoDB();
	const user = await UserModel.findOne({ email });
	if (!user) return NextResponse.json({ error: 'Incompatibilité e-mail/mot de passe !' });

	const passwordMatch = await user.comparePassword(password);
	if (!passwordMatch)
		return NextResponse.json({ error: 'Incompatibilité e-mail/mot de passe !' });

	return NextResponse.json({
		user: {
			id: user._id.toString(),
			lastname: user.lastname,
			firstname: user.firstname,
			email: user.email,
			avatar: user.avatar?.url,
			role: user.role,
		},
	});
};
