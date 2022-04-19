import { createClient, createCurrentUserHook } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url'

const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2021-10-21",
    useCdn: process.env.NODE_ENV === "production",
}

const sanityClient = createClient(config);

const urlFor = (source) => createImageUrlBuilder(config).image(source);

const useCurrentUser = createCurrentUserHook(config);

export { config, sanityClient, urlFor, useCurrentUser };