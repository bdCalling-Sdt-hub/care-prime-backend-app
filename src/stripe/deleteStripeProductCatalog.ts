import stripe from "../config/stripe";

export const deleteStripeProductCatalog = async (productId: string): Promise<{ success: boolean }> => {
    // Fetch all active prices for the product
    const prices = await stripe.prices.list({ product: productId, active: true });

    // deactivate all prices
    for (const price of prices.data) {
        await stripe.prices.update(price.id, { active: false });
    }

    // delete the product
    const result = await stripe.products.del(productId);

    if(!result){
        return { success: false }
    }

    return { success: true };
};
