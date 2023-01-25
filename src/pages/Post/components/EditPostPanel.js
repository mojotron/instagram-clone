// hooks
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { usePost } from '../../../hooks/usePost';
import { useScreenSizeContext } from '../../../hooks/useScreenSizeContext';
// components
import EmojiPicker from 'emoji-picker-react';
import Avatar from '../../../components/Avatar';
import PostImage from '../../../components/PostImage';
// styles
import './styles/EditPostPanel.css';
// icons
import {
  MdSentimentSatisfiedAlt,
  MdOutlineLocationOn,
  MdExpandMore,
  MdExpandLess,
} from 'react-icons/md';

const EditPostPanel = ({ postData, closeHandler }) => {
  const { screenSize } = useScreenSizeContext();
  const { response } = useUserDataContext();
  const { editPost } = usePost();
  const navigate = useNavigate();

  const textareaRef = useRef();

  const [caption, setCaption] = useState(postData.caption);
  const [location, setLocation] = useState(postData.location);
  const [altTexts, setAltTexts] = useState(postData.images.map(ele => ele.alt));

  const [showEmojis, setShowEmojis] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);

  const handleEmojiClick = e => {
    const emoji = e.emoji;
    setCaption(oldValue => oldValue + emoji);
    setShowEmojis(false);
    textareaRef.current.focus();
  };

  const handleAltChange = (e, i) => {
    setAltTexts(oldValue => {
      const temp = oldValue.map((text, index) => {
        if (index === i) return e.target.value;
        else return text;
      });
      return temp;
    });
  };

  const handleClickEditPost = async () => {
    const newData = {
      caption,
      location,
      images: postData.images.map((img, i) => ({
        ...img,
        alt: altTexts[i],
      })),
    };

    await editPost(newData, postData.id);
    closeHandler();
  };
  // TODO responsive design

  return (
    <div className="child-overlay">
      <div className="EditPostPanel">
        <header className="EditPostPanel__header">
          <button onClick={closeHandler} className="btn">
            Cancel
          </button>
          <h2>Edit info</h2>
          <button className="btn btn--blue" onClick={handleClickEditPost}>
            Done
          </button>
        </header>
        {/* TODO screen size on body and img container */}
        <div
          className="EditPostPanel__body"
          style={{ flexDirection: screenSize === 'small' ? 'column' : 'row' }}
        >
          <div className="EditPostPanel__body__image">
            <div className="EditPostPanel__body__image__container">
              <PostImage
                imagesData={postData.images}
                dimensions={postData.dimensions}
              />
            </div>
          </div>

          <div className="EditPostPanel__body__edit">
            <header className="EditPostPanel__body__edit__header">
              <Avatar
                url={response.document.avatar.url}
                size={35}
                handleClick={() => navigate(`/${response.document.userName}`)}
              />
              <h2 onClick={() => navigate(`/${response.document.userName}`)}>
                {response.document.userName}
              </h2>
            </header>
            <form className="EditPostPanel__body__edit__form">
              <textarea
                value={caption}
                onChange={e => setCaption(e.target.value)}
                minLength="0"
                maxLength="2200"
                placeholder="Write a caption..."
                autoCorrect="off"
                ref={textareaRef}
              />

              <div className="EditPostPanel__body__edit__form__emoji">
                <button
                  type="button"
                  className="btn btn-"
                  onClick={() => setShowEmojis(oldValue => !oldValue)}
                >
                  <MdSentimentSatisfiedAlt size={22} color="var(--gray)" />
                </button>
                {showEmojis && (
                  <EmojiPicker
                    emojiStyle="native"
                    onEmojiClick={handleEmojiClick}
                  />
                )}
                <p>{caption.length}/2200</p>
              </div>

              <label>
                <input
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  type="text"
                  placeholder="Add location"
                  maxLength="50"
                />
                <span className="label-icon">
                  <MdOutlineLocationOn size={22} color="var(--black)" />
                </span>
              </label>

              <div className="EditPostPanel__body__edit__form__accessibility">
                <header
                  onClick={() => setShowAccessibility(oldValue => !oldValue)}
                >
                  <h3>Accessibility</h3>
                  <span>
                    {showAccessibility ? (
                      <MdExpandLess size={22} color="var(--black)" />
                    ) : (
                      <MdExpandMore size={22} color="var(--black)" />
                    )}
                  </span>
                </header>

                {showAccessibility && (
                  <section className="ImageInfoPanel__expand">
                    <p>
                      Alt text describes your photos for people with visual
                      impairments. Alt text will be automatically created for
                      your photos or you can choose to write your own.
                    </p>

                    <div className="ImageInfoPanel__expand__input">
                      {postData.images.map((ele, i) => (
                        <div key={i}>
                          <PostImage
                            dimensions={postData.dimensions}
                            imagesData={[ele]}
                          />
                          <input
                            value={altTexts[i]}
                            onChange={e => handleAltChange(e, i)}
                            placeholder="Write alt text"
                            maxLength="250"
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPostPanel;
