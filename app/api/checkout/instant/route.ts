import ProductModel from '@/app/models/products';
import { auth } from '@/auth';
import { isValidObjectId } from 'mongoose';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2023-10-16',
});

export const POST = async (req: Request) => {
	try {
		const session = await auth();
		if (!session?.user)
			return NextResponse.json(
				{
					error: 'Demande non autorisée',
				},
				{ status: 401 }
			);

		const data = await req.json();
		const productId = data.productId as string;

		if (!isValidObjectId(productId))
			return NextResponse.json({ error: 'Identifiant de produit invalide' }, { status: 401 });

		const product = await ProductModel.findById(productId);
		if (!product) return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 });

		const line_items = {
			price_data: {
				currency: 'EUR',
				unit_amount: product.price.discounted * 100,
				product_data: {
					name: product.title,
					images: [product.thumbnail.url],
				},
			},
			quantity: 1,
		};

		const customer = await stripe.customers.create({
			metadata: {
				userId: session.user.id,
				type: 'instant-checkout',
				product: JSON.stringify({
					id: product.id,
					title: product.title,
					price: product.price.discounted,
					thumbnail: product.thumbnail.url,
					qty: 1,
				}),
			},
		});

		const params: Stripe.Checkout.SessionCreateParams = {
			mode: 'payment',
			payment_method_types: ['card'],
			line_items: [line_items],
			success_url: process.env.PAYMENT_SUCCESS_URL!,
			cancel_url: process.env.PAYMENT_CANCEL_URL!,
			shipping_address_collection: { allowed_countries: ['FR'] },
			customer: customer.id,
		};
		const checkoutSession = await stripe.checkout.sessions.create(params);
		return NextResponse.json({ url: checkoutSession.url });
	} catch (error) {
		return NextResponse.json(
			{ error: "Oups ! quelque chose s'est mal passé !" },
			{ status: 500 }
		);
	}
};
