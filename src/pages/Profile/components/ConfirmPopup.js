import Avatar from '../../../components/Avatar';
// use styling of Pages => CreatePost => DiscardPost css
const ConfirmPopup = ({ text, targetData, handleCancel, handleAction }) => {
  const handleUnfollow = async () => {
    try {
      await handleAction();
      handleCancel();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overlay">
      <div className="DiscardPost" style={{ paddingTop: '20px' }}>
        <Avatar url={targetData.avatar.url} size={56} />
        <p style={{ paddingTop: '20px' }}>
          {text} @{targetData.userName}?
        </p>
        <button onClick={handleUnfollow} className="btn discard">
          {text}
        </button>
        <button onClick={handleCancel} className="btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmPopup;
