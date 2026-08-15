export const formatProductPrice = (price: number): string =>
  price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

export const getProductDisplayRating = (
  productId: string
): { rating: number; reviewCount: number } => {
  let hash = 0;
  for (let i = 0; i < productId.length; i += 1) {
    hash = productId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const abs = Math.abs(hash);
  return {
    rating: 4 + (abs % 10) / 10,
    reviewCount: 50 + (abs % 451),
  };
};
