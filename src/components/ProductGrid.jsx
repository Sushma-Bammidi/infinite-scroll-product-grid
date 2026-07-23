import ProductCard from './ProductCard';

const ProductGrid = ({ products, onSelectProduct }) => {
  return (
    <section className="product-grid" aria-label="Product catalog">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
      ))}
    </section>
  );
};

export default ProductGrid;
