import { useState, useRef } from 'react';
import './styles/ImageInfoPanel.css';
import EmojiPicker from 'emoji-picker-react';
// components
import CreatePostHeader from './CreatePostHeader';
import PostImage from '../../../components/PostImage';
import Avatar from '../../../components/Avatar';
import SwitchCheckbox from '../../../components/SwitchCheckbox';
// icons
import smileIcon from '../../../images/smile-icon.svg';
import locationIcon from '../../../images/location-icon.svg';
import expandShowIcon from '../../../images/expand-show-icon.svg';
import expandHideIcon from '../../../images/expand-hide-icon.svg';
// hooks
import { useUserPostContext } from '../../../hooks/useUserPostContext';

const ImageInfoPanel = ({ userData, handleCreatePost, error, isPending }) => {
  const {
    dimensions,
    imagesData,
    setImagesData,
    postInfo,
    setPostInfo,
    setCurrentStage,
  } = useUserPostContext();

  const [showEmojis, setShowEmojis] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showAdvanceSettings, setShowAdvanceSettings] = useState(false);
  const textareaRef = useRef();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setPostInfo(oldValue => ({
      ...oldValue,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAltChange = (e, index) => {
    setImagesData(oldData => {
      const temp = oldData.map((ele, i) => {
        if (i === index) return { ...ele, alt: e.target.value };
        else return ele;
      });
      return temp;
    });
  };

  const handleEmojiClick = e => {
    const emoji = e.emoji;
    setPostInfo(oldValue => ({
      ...oldValue,
      caption: oldValue.caption + emoji,
    }));
    setShowEmojis(false);
    textareaRef.current.focus();
  };

  return (
    <>
      <CreatePostHeader
        title={`${error ? error : 'Create New Post'}`}
        btnText={`${isPending ? 'Loading...' : 'Share'}`}
        handleNext={handleCreatePost}
        handlePrev={() => setCurrentStage('set-filter-layers')}
      />

      <div className="ImageInfoPanel">
        <section className="ImageInfoPanel__image">
          <PostImage dimensions={dimensions} imagesData={imagesData} />
        </section>

        <section className="ImageInfoPanel__info">
          <div className="ImageInfoPanel__info__user">
            <Avatar url={userData.avatar.url} size="mid" />
            <h2>{userData.userName}</h2>
          </div>

          <form className="ImageInfoPanel__info__form">
            <textarea
              value={postInfo.caption}
              onChange={handleChange}
              name="caption"
              minLength="0"
              maxLength="2200"
              placeholder="Write a caption..."
              autoCorrect="off"
              ref={textareaRef}
            />

            <div className="ImageInfoPanel__info__form__emoji">
              <button
                type="button"
                className="btn"
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
              <p data-testid="caption-char-count">
                {postInfo.caption.length}/2200
              </p>
            </div>

            <label>
              <input
                value={postInfo.location}
                name="location"
                onChange={handleChange}
                type="text"
                placeholder="Add location"
                maxLength="50"
              />
              <span className="label-icon">
                <img src={locationIcon} alt="location pin" />
              </span>
            </label>

            <div className="ImageInfoPanel__info__form__dropdown">
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
                    impairments. Alt text will be automatically created for your
                    photos or you can choose to write your own.
                  </p>

                  <div className="ImageInfoPanel__expand__input">
                    {imagesData.map((ele, i) => (
                      <div key={i}>
                        <PostImage dimensions={dimensions} imagesData={[ele]} />
                        <input
                          data-testid="alt-input"
                          value={imagesData[i].alt}
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

            <div className="ImageInfoPanel__info__form__dropdown">
              <header
                onClick={() => setShowAdvanceSettings(oldValue => !oldValue)}
              >
                <h3>Advance settings</h3>
                <span>
                  <img
                    src={showAdvanceSettings ? expandHideIcon : expandShowIcon}
                    alt={`${showAdvanceSettings ? 'hide' : 'expand'}`}
                  />
                </span>
              </header>

              {showAdvanceSettings && (
                <section className="ImageInfoPanel__expand">
                  <div className="expand-container">
                    <header>
                      <h3>Hide like and view counts on this post</h3>
                      <SwitchCheckbox
                        value={postInfo.disableLikes}
                        name="disableLikes"
                        handleChange={handleChange}
                      />
                    </header>
                    <p>
                      Only you will see the total number of likes and views on
                      this post. You can change this later by going to the ···
                      menu at the top of the post.
                    </p>
                  </div>

                  <div className="expand-container">
                    <header>
                      <h3>Turn off commenting</h3>
                      <SwitchCheckbox
                        value={postInfo.disableComments}
                        name="disableComments"
                        handleChange={handleChange}
                      />
                    </header>
                    <p>
                      You can change this later by going to the ··· menu at the
                      top of your post.
                    </p>
                  </div>
                </section>
              )}
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default ImageInfoPanel;
