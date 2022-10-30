const FormatCount = ({ num, title, handleClick }) => {
  return (
    <p style={{ cursor: handleClick ? 'pointer' : 'default' }}>
      <span>{num}</span> {num === 1 ? title : `${title}s`}
    </p>
  );
};

export default FormatCount;
