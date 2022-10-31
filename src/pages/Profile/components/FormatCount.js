const FormatCount = ({ num, title, handleClick }) => {
  return (
    <p
      onClick={handleClick}
      style={{ cursor: handleClick ? 'pointer' : 'default' }}
    >
      <span>{num}</span> {num === 1 ? title : `${title}s`}
    </p>
  );
};

export default FormatCount;
