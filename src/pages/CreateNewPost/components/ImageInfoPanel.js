import { useState, useRef } from 'react';
import './styles/ImageInfoPanel.css';
import { useFiltersAndLayersContext } from '../../../hooks/useFiltersAndLayersContext';
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

import { useUserPostContext } from '../../../hooks/useUserPostContext';

const ImageInfoPanel = ({ postData, userData, handleUploadPost }) => {
  const { dimensions, imagesData } = useUserPostContext();

  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [altText, setAltText] = useState('');

  const [disableLikes, setDisableLikes] = useState(false);
  const [disableComments, setDisableComments] = useState(false);

  const [showEmojis, setShowEmojis] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showAdvanceSettings, setShowAdvanceSettings] = useState(false);

  const { createCssFilter, createCssLayers } = useFiltersAndLayersContext();

  const textareaRef = useRef();

  const handleEmojiClick = e => {
    const emoji = e.emoji;
    setCaption(oldValue => oldValue + emoji);
    setShowEmojis(false);
    textareaRef.current.focus();
  };

  return (
    <>
      <CreatePostHeader
        title="Create New Post"
        btnText="Share"
        handleNext={() =>
          handleUploadPost({
            caption,
            location,
            altText,
            disableLikes,
            disableComments,
          })
        }
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
              value={caption}
              onChange={e => setCaption(e.target.value)}
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
              <p>{caption.length}/2200</p>
            </div>

            <label>
              <input type="text" placeholder="Add location" maxLength="50" />
              <span className="label-icon">
                <img
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  src={locationIcon}
                  alt="location pin"
                />
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
                    alt="expand"
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
                    <PostImage
                      postSize={postData.postSize}
                      src={postData.src}
                      aspectRatio={postData.aspectRatio}
                      zoomLevel={postData.zoomLevel}
                      position={postData.position}
                      cssFilter={createCssFilter()}
                      layers={createCssLayers()}
                    />
                    <input
                      value={altText}
                      onChange={e => setAltText(e.target.value)}
                      placeholder="Write alt text"
                      maxLength="250"
                    />
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
                    alt="expand"
                  />
                </span>
              </header>

              {showAdvanceSettings && (
                <section className="ImageInfoPanel__expand">
                  <div className="expand-container">
                    <header>
                      <h3>Hide like and view counts on this post</h3>
                      <SwitchCheckbox
                        value={disableLikes}
                        handleChange={() =>
                          setDisableLikes(oldValue => !oldValue)
                        }
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
                        value={disableComments}
                        handleChange={() =>
                          setDisableComments(oldValue => !oldValue)
                        }
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
