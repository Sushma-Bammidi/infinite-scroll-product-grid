import { useCallback, useEffect, useRef, useState } from 'react';
import ProductGrid from './components/ProductGrid';
import Loader from './components/Loader';
import EndMessage from './components/EndMessage';
import LoadMoreButton from './components/LoadMoreButton';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import { fetchProducts } from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const skipRef = useRef(0);
  const loadingRef = useRef(false);

  const loadProducts = useCallback(async (skip = 0) => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);
    setError('');

    try {
      const data = await fetchProducts(skip);
      setProducts((prev) => (skip === 0 ? data.products : [...prev, ...data.products]));
      setTotalProducts(data.total);
      setHasMore(skip + data.products.length < data.total);
      skipRef.current = skip + data.products.length;
    } catch (err) {
      setError('Unable to load products right now. Please try again.');
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts(0);
  }, [loadProducts]);

  const handleLoadMore = useCallback(() => {
    if (!loadingRef.current && hasMore) {
      loadProducts(skipRef.current);
    }
  }, [hasMore, loadProducts]);

  const { sentinelRef, showLoadMore } = useInfiniteScroll({
    onLoadMore: handleLoadMore,
    loading,
    hasMore,
  });

  const handleRetry = () => {
    loadProducts(0);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-copy">
          <p className="eyebrow">Essentials</p>
          <h1>Discover products that feel premium.</h1>
          <p className="header-subtitle">Browse a refined catalog with seamless loading, thoughtful details, and a modern shopping experience.</p>
        </div>
        <div className="header-actions">
          <div className="pill">Trusted quality</div>
        </div>
      </header>

      <section className="catalog-hero">
        <div>
          <p className="hero-label">New arrivals</p>
          <h2>Built for effortless browsing.</h2>
        </div>
        <div className="hero-stats">
          <div>
            <strong>20+</strong>
            <span>Items per page</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>Responsive layout</span>
          </div>
        </div>
      </section>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={handleRetry}>Try Again</button>
        </div>
      )}

      {products.length > 0 ? (
        <>
          <div className="catalog-toolbar">
            <p>{Math.min(products.length, totalProducts)} of {totalProducts} products shown</p>
            <span>Instant discovery</span>
          </div>
          <ProductGrid products={products} onSelectProduct={setSelectedProduct} />
          {loading && <Loader text="Loading more..." />}
          {showLoadMore && hasMore && !loading && (
            <LoadMoreButton onClick={() => loadProducts(skipRef.current)} disabled={loading} />
          )}
          {!hasMore && !loading && <EndMessage />}
          <div ref={sentinelRef} className="sentinel" />
        </>
      ) : (
        !loading && !error && <p className="empty-state">No products are currently available. Please try again shortly.</p>
      )}

      {loading && products.length === 0 && <Loader text="Loading products..." />}

      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)} aria-label="Close product details">
              ×
            </button>
            <img src={selectedProduct.thumbnail} alt={selectedProduct.title} className="modal-image" />
            <div className="modal-content">
              <div className="modal-title-row">
                <div>
                  <p className="modal-eyebrow">{selectedProduct.brand}</p>
                  <h2>{selectedProduct.title}</h2>
                </div>
                <div className="modal-price-box">
                  <span className="modal-price">${selectedProduct.price}</span>
                  <span className="discount">{selectedProduct.discountPercentage}% off</span>
                </div>
              </div>
              <div className="modal-meta">
                <span className="rating">⭐ {selectedProduct.rating}</span>
                <span className="category">{selectedProduct.category}</span>
                <span className="stock">{selectedProduct.stock} in stock</span>
              </div>
              <p className="description">{selectedProduct.description}</p>
              <div className="modal-footer">
                <span className="brand">{selectedProduct.brand}</span>
                <span className="stock">{selectedProduct.availabilityStatus}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
