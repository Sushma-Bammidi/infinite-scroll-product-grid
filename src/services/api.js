export async function fetchProducts(skip = 0, limit = 20) {
  const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products from the API');
  }

  return response.json();
}
