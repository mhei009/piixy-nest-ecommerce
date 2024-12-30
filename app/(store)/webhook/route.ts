import { Metadata } from "@/actions/createCheckoutSession";
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
    // create order in Sanity
    // return order
async function createOrderInSanity(session: Stripe.Checkout.Session) {

    const {
        id, 
        amount_total,
        currency,
        metadata,
        payment_intent,
        customer,
        total_details,
    

    } = session

    const {
        orderNumber,
        customerName,
        customerEmail,
        clerkUserId,
    } = metadata as Metadata;


    // get information from checkoutchekout sessions to access metadata
    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
        id,
        {
            expand: ["dataset.price.product"],
        }
    );


    //transforms each line item from the Stripe checkout session into a format 
// that can be used to create order documents in Sanity CMS. For each item, it:
//  makes a unique ID (_key) for the product.
// adds a reference to the product (_ref) in Sanity, using the product's ID from Stripe.



    const sanityProducts = lineItemsWithProduct.data.map ((item) => ({
        _key: crypto.randomUUID(),
        product: {
            _type: "reference",
            _ref: (item.price?.product as Stripe.Product).metadata?.id,
        },
        quantity: item.quantity || 0,
    })
    )
}
