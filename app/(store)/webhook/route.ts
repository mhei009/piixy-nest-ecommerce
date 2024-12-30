import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const headerList = await headers();
    const sig = headerList.get("stripe-signature");

    if (!sig) {
        return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.error("Stripe webhook secret is not set");
        return NextResponse.json({ error: "stripe webhook secret is not set" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
        console.error("Error verifying webhook signature:", err);
        return NextResponse.json({ error: "Error verifying webhook signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
  
        try {
            const order = await createOrderInSanity(session);
            console.log("Order created in Sanity", order);
            
        } catch (err) {
            console.error("Error creating order in Sanity", err);
            return NextResponse.json(
                { error: "Error creating order " }, { status: 500 });
            
        }
    }

    return NextResponse.json({ received: true });
}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
    // create order in Sanity
    // return order
}
