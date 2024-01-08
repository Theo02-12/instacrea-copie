import connectMongoDB from '@/app/lib/mongodb';
import UserModel from '@/app/models/userModel';
import { auth } from '@/auth';

import { NextResponse } from 'next/server';

connectMongoDB();

export async function GET() {
	const session = await auth();
	// Vérifie si l'utilisateur est authentifié
	if (!session) {
		return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
	}

	// Vérifie si l'utilisateur a le rôle admin
	if (session.user.role !== 'admin') {
		return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 });
	}

	try {
		const users = await UserModel.find({});

		if (!users || users.length === 0) {
			return NextResponse.json({ error: 'Aucun utilisateur trouvé' }, { status: 404 });
		}

		const userArray = users.map((user) => ({
			lastname: user.lastname,
			firstname: user.firstname,
			email: user.email,
		}));

		return NextResponse.json(userArray, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Erreur lors de la récupération des utilisateurs' },
			{ status: 500 }
		);
	}
}
