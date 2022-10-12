import { useState } from 'react';
import './styles/ImageInfoPanel.css';
import { useFiltersAndLayersContext } from '../../../hooks/useFiltersAndLayersContext';
// components
import CreatePostHeader from './CreatePostHeader';
import PostImage from '../../../components/PostImage';
import Avatar from '../../../components/Avatar';
// icons
import smileIcon from '../../../images/smile-icon.svg';
import locationIcon from '../../../images/location-icon.svg';
import expandShowIcon from '../../../images/expand-show-icon.svg';
import expandHideIcon from '../../../images/expand-hide-icon.svg';

const SliderCheckBox = () => {
  return (
    <label className="switch">
      <input type="checkbox" />
      <span className="slider round"></span>
    </label>
  );
};

const ImageInfoPanel = ({ postData, userData }) => {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [altText, setAltText] = useState('');

  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showAdvanceSettings, setShowAdvanceSettings] = useState(false);

  const { createCssFilter, createCssLayers } = useFiltersAndLayersContext();
  return (
    <>
      <CreatePostHeader title="Create New Post" />

      <div className="ImageInfoPanel">
        <section className="ImageInfoPanel__image">
          <PostImage
            postSize={postData.postSize}
            src={postData.src}
            aspectRatio={postData.aspectRatio}
            zoomLevel={postData.zoomLevel}
            position={postData.position}
            cssFilter={createCssFilter()}
            layers={createCssLayers()}
          />
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
            />

            <div className="ImageInfoPanel__info__form__emoji">
              <button className="btn">
                <img src={smileIcon} alt="emojis" />
              </button>
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
                      <SliderCheckBox />
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
                      <SliderCheckBox />
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
