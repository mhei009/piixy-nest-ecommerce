
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "../sanity/lib/client";



const builder = imageUrlBuilder(client);


export function imageUrl(source: SanityImageSource) {
    return builder.image(source)
}