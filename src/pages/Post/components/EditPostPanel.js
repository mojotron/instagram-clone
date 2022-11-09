import PostImage from '../../../components/PostImage';
import './styles/EditPostPanel.css';

const EditPostPanel = ({ postData }) => {
  return (
    <div className="child-overlay">
      <div className="EditPostPanel">
        <header className="EditPostPanel__header">
          <button className="btn">Cancel</button>
          <h2>Edit info</h2>
          <button className="btn btn--blue">Done</button>
        </header>
        <div className="EditPostPanel__body">
          <div className="EditPostPanel__body__image">
            <div className="EditPostPanel__body__image__container">
              <PostImage
                imagesData={postData.images}
                dimensions={postData.dimensions}
              />
            </div>
          </div>
          <div className="EditPostPanel__body__edit"></div>
        </div>
      </div>
    </div>
  );
};

export default EditPostPanel;
