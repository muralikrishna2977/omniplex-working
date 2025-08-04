// // src/app/api/create-checkout-session/route.ts

// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-07-30.basil",
// });


// export async function POST() {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: "Pro Plan",
//             },
//             unit_amount: 1000, // $10
//           },
//           quantity: 1,
//         },
//       ],
//       success_url: "http://localhost:3000/success",
//       cancel_url: "http://localhost:3000/cancel",
//     });

//     return NextResponse.json({ id: session.id });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

console.log("🔑 Stripe Key:", stripeSecretKey); // Check in Railway Deploy Logs

if (!stripeSecretKey) {
  console.error("❌ STRIPE_SECRET_KEY is missing");
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2022-11-15" as any,
});

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Pro Plan" },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      success_url: "https://omniplex-working-production.up.railway.app/success",
      cancel_url: "https://omniplex-working-production.up.railway.app/cancel",
    });

    console.log("✅ Session ID:", session.id);
    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error("❌ Stripe error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
