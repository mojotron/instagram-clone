import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
// components
import Avatar from '../../../components/Avatar';
import PostImage from '../../../components/PostImage';
// hook
import { useUserDataContext } from '../../../hooks/useUserDataContext';
// styles
import './styles/EditPostPanel.css';
// icons
// icons
import smileIcon from '../../../images/smile-icon.svg';
import locationIcon from '../../../images/location-icon.svg';
import expandShowIcon from '../../../images/expand-show-icon.svg';
import expandHideIcon from '../../../images/expand-hide-icon.svg';

const EditPostPanel = ({ postData, closeHandler }) => {
  // console.log(postData);
  const { response } = useUserDataContext();
  const navigate = useNavigate();
  const textareaRef = useRef();

  const [caption, setCaption] = useState(postData.caption);
  const [location, setLocation] = useState(postData.location);
  const [altTexts, setAltTexts] = useState(postData.images.map(ele => ele.alt));
  // console.log(altTexts);
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

  return (
    <div className="child-overlay">
      <div className="EditPostPanel">
        <header className="EditPostPanel__header">
          <button onClick={closeHandler} className="btn">
            Cancel
          </button>
          <h2>Edit info</h2>
          <button
            className="btn btn--blue"
            onClick={() => console.log('DO MAGIC NOW')}
          >
            Done
          </button>
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
          <div className="EditPostPanel__body__edit">
            <header className="EditPostPanel__body__edit__header">
              <Avatar
                url={response.document.avatar.url}
                size="mid"
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
                  <img src={smileIcon} alt="emojis" />
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
                  <img src={locationIcon} alt="location" />
                </span>
              </label>

              <div className="EditPostPanel__body__edit__form__accessibility">
                <header
                  onClick={() => setShowAccessibility(oldValue => !oldValue)}
                >
                  <h3>Accessibility</h3>
                  <span>
                    <img
                      src={showAccessibility ? expandHideIcon : expandShowIcon}
                      alt={`${showAccessibility ? 'hide' : 'expand'}`}
                    />
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
