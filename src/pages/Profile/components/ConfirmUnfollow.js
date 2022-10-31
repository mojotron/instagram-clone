import Avatar from '../../../components/Avatar';
// use styling of Pages => CreatePost => DiscardPost css
const ConfirmUnfollow = ({
  targetData,
  handleCancel,
  handleUnfollowAccount,
}) => {
  const handleUnfollow = async () => {
    try {
      await handleUnfollowAccount();
      handleCancel();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="overlay">
      <div className="DiscardPost" style={{ paddingTop: '20px' }}>
        <Avatar url={targetData.avatar.url} size="mid-2" />
        <p style={{ paddingTop: '20px' }}>Unfollow @{targetData.userName}?</p>
        <button onClick={handleUnfollow} className="btn discard">
          Unfollow
        </button>
        <button onClick={handleCancel} className="btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmUnfollow;
