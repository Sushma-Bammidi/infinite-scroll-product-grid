const LoadMoreButton = ({ onClick, disabled = false }) => {
  return (
    <div className="load-more-wrapper">
      <button className="load-more-button" onClick={onClick} disabled={disabled}>
        {disabled ? 'Loading…' : 'Load More'}
      </button>
    </div>
  );
};

export default LoadMoreButton;
