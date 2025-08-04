"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

// ✅ Log env key at component load
console.log(
  "🌐 NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:",
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutButton() {
  useEffect(() => {
    stripePromise.then((stripe) => {
      if (!stripe) {
        console.error("❌ Stripe failed to initialize.");
      } else {
        console.log("✅ Stripe initialized on client.");
      }
    });
  }, []);

  const handleClick = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Backend Error:", data.error || data);
      alert("Checkout session creation failed.");
      return;
    }

    console.log("✅ Stripe session ID:", data.id);

    const stripe = await stripePromise;
    const result = await stripe?.redirectToCheckout({
      sessionId: data.id,
    });

    if (result?.error) {
      console.error("❌ Stripe redirect error:", result.error.message);
      alert(result.error.message);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Buy Pro Plan - $10
    </button>
  );
}
