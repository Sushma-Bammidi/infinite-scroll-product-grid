const ProductCard = ({ product, onSelectProduct }) => {
  const hasDiscount = Number(product.discountPercentage) > 0;

  return (
    <button className="product-card" type="button" onClick={() => onSelectProduct(product)}>
      {hasDiscount && (
        <div className="discount-badge">-{Number(product.discountPercentage).toFixed(2)}%</div>
      )}
      <img src={product.thumbnail} alt={product.title} className="product-image" loading="lazy" />
      <div className="product-info">
        <div className="product-title-row">
          <h3>{product.title}</h3>
          <span className="product-price">${product.price}</span>
        </div>
        <div className="product-meta">
          <span className="rating">⭐ {product.rating}</span>
          <span className="category">{product.category}</span>
        </div>
        <p className="description">{product.description}</p>
        {product.brand && <p className="brand">Brand: {product.brand}</p>}
      </div>
    </button>
  );
};

export default ProductCard;
