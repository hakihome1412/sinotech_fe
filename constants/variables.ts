const Variables = {
    DISPLAY_ITEM_PRODUCT: 15,
    CONFIG_API: {
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        useCdn: process.env.NODE_ENV === "production",
        token: process.env.SANITY_API_TOKEN
    }
}

export default Variables;