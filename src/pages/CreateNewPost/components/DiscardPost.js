import './styles/DiscardPost.css';

const DiscardPost = ({ handleCancel, handleDiscard }) => {
  return (
    <div className="overlay" style={{ zIndex: 15 }}>
      <div className="DiscardPost">
        <h2>Discard post?</h2>
        <p>If you leave, your edits won't be saved.</p>
        <button className="btn discard" onClick={handleDiscard}>
          Discard
        </button>
        <button className="btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DiscardPost;
