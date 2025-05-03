import { imageUrl } from "@/lib/imageUrl";
import getProductBySlug from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "next-sanity";
import AddToBasketButton from "@/components/AddToBasketButton";

export const dynamic = "force-dynamic";
export const revalidate = 60;

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params; // ✅ await required here in Next 15
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${
            isOutOfStock ? "opacity-50" : ""
          }`}
        >
          {product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name ?? "Product Image"}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <span className="text-white text-lg font-bold">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="text-xl font-semibold mb-4">
              {product.price?.toFixed(2)} SEK
            </div>
            <div className="prose max-w-none mb-6">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>
          </div>

          <div className="mt-3">
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
}
