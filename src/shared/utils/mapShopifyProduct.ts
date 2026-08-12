import { Product } from '@features/home/types/home.types';

export interface ShopifyProductNode {
  id?: string;
  title?: string;
  productType?: string;
  featuredImage?: { url?: string };
  priceRange?: { minVariantPrice?: { amount?: string } };
  compareAtPriceRange?: { maxVariantPrice?: { amount?: string } };
  options?: { name: string; values?: string[] }[];
  variants?: {
    edges?: {
      node?: {
        id?: string;
        selectedOptions?: { name: string; value: string }[];
      };
    }[];
  };
}

const getDefaultVariantId = (node: ShopifyProductNode): string | undefined => {
  if (!node.variants?.edges?.length) return undefined;
  if (!node.options?.length) return node.variants.edges[0]?.node?.id;

  const defaultOptions = node.options.map((opt) => ({
    name: opt.name,
    value: opt.values?.[0] || '',
  }));

  const matchingEdge = node.variants.edges.find((edge) => {
    const vNode = edge.node || {};
    return defaultOptions.every((defOpt) => {
      const selected = vNode.selectedOptions?.find(
        (sel) => sel.name.toLowerCase() === defOpt.name.toLowerCase()
      );
      return selected && selected.value === defOpt.value;
    });
  });

  return matchingEdge?.node?.id || node.variants.edges[0]?.node?.id;
};

export const mapShopifyProduct = (
  edge: { node?: ShopifyProductNode },
  index: number
): Product => {
  const node = edge?.node || {};
  const price = parseFloat(node.priceRange?.minVariantPrice?.amount || '0');
  const compareAt = node.compareAtPriceRange?.maxVariantPrice?.amount
    ? parseFloat(node.compareAtPriceRange.maxVariantPrice.amount)
    : undefined;

  const discount =
    compareAt && compareAt > price
      ? Math.round(((compareAt - price) / compareAt) * 100)
      : undefined;

  return {
    id: node.id || `prod-${index}`,
    title: node.title || 'Product',
    price,
    compareAtPrice: compareAt,
    image: node.featuredImage?.url || '',
    category: node.productType || 'General',
    discount,
    firstVariantId: getDefaultVariantId(node),
  };
};
