import { getCartItems } from '@/app/lib/cartHelper';
import CartModel from '@/app/models/cartModel';
import OrderModel from '@/app/models/orderModel';
import ProductModel from '@/app/models/products';
import { StripeCustomer } from '@/app/types';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY!;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const stripe = new Stripe(stripeSecret, {
	apiVersion: '2023-10-16',
});

export const POST = async (req: Request) => {
	const data = await req.text();

	const signature = req.headers.get('stripe-signature')!;

	let event;

	try {
		event = await stripe.webhooks.constructEvent(data, signature, webhookSecret);
	} catch (error) {
		console.log(error);

		return NextResponse.json({ error: (error as any).message }, { status: 400 });
	}

	console.log(event.type);
	if (event.type === 'checkout.session.completed') {
		const stripeSession = event.data.object as {
			customer: string;
			payment_intent: string;
			amount_subtotal: number;
			customer_details: any;
			payment_status: string;
		};

		const customer = (await stripe.customers.retrieve(
			stripeSession.customer
		)) as unknown as StripeCustomer;

		const { cartId, userId, type } = customer.metadata;
		if (type === 'checkout') {
			const cartItems = await getCartItems(userId, cartId);
			await OrderModel.create({
				userId,
				stripeCustomerId: stripeSession.customer,
				paymentIntent: stripeSession.payment_intent,
				totalAmount: stripeSession.amount_subtotal / 100,
				shippingDetails: {
					address: {
						...stripeSession.customer_details.address,
						state: stripeSession.customer_details.address.state || 'N/A',
					},
					email: stripeSession.customer_details.email,
					name: stripeSession.customer_details.name,
				},
				paymentStatus: stripeSession.payment_status,
				deliveryStatus: 'ordered',
				orderItems: cartItems.products,
			});
			// recount our stock
			const updateProductPromises = cartItems.products.map(async (product) => {
				await ProductModel.findByIdAndUpdate(product.id, {
					$inc: { quantity: -product.qty },
				});
			});

			await Promise.all(updateProductPromises);

			// Remove the cart
			await CartModel.findByIdAndDelete(cartId);
		}
	}

	return NextResponse.json({});
};
