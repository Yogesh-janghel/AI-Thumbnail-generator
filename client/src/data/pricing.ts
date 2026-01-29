import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Basic",
        price: 49,
        period: "month",
        features: [
            "50 AI thumbnails per month",
            "Basic templates",
            "Standard Resolution",
            "No watermark",
            "Email support"
        ],
        mostPopular: false
    },
    {
        name: "Pro",
        price: 99,
        period: "month",
        features: [
            "Unlimited AI thumbnails",
            "Premium templates",
            "4k Resolution",
            "A/B testing features",
            "Priority email support",
            "Custom font",
            "Brand kit Analysis"
        ],
        mostPopular: true
    },
    {
        name: "Enterprise",
        price: 199,
        period: "month",
        features: [
            "Everything in Pro",
            "API Access",
            "Team Collaboration",
            "Custom Branding",
            "Desicated Account Manager",
        ],
        mostPopular: false
    }
];