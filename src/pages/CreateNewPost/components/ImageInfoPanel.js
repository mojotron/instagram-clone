// hooks
import { useUserPostContext } from '../../../hooks/useUserPostContext';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { useState, useRef } from 'react';
import { useScreenSizeContext } from '../../../hooks/useScreenSizeContext';

// style
import './styles/ImageInfoPanel.css';
// components
import EmojiPicker from 'emoji-picker-react';
import CreatePostHeader from './CreatePostHeader';
import PostImage from '../../../components/PostImage';
import Avatar from '../../../components/Avatar';
import SwitchCheckbox from '../../../components/SwitchCheckbox';
// icons
import {
  MdSentimentSatisfiedAlt,
  MdOutlineLocationOn,
  MdExpandMore,
  MdExpandLess,
} from 'react-icons/md';

const ImageInfoPanel = ({ handleCreatePost, error, isPending }) => {
  const { response } = useUserDataContext();
  const { screenSize } = useScreenSizeContext();

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

      <div
        className="ImageInfoPanel"
        style={
          screenSize === 'small'
            ? {
                flexDirection: 'column',
                height: '90vh',
                width: '335px',
                overflowY: 'scroll',
              }
            : { flexDirection: 'row' }
        }
      >
        <section
          className="ImageInfoPanel__image"
          style={
            screenSize === 'small'
              ? { height: '335px', width: '335px' }
              : { height: '435px', width: '435px' }
          }
        >
          <PostImage dimensions={dimensions} imagesData={imagesData} />
        </section>

        <section className="ImageInfoPanel__info">
          <div className="ImageInfoPanel__info__user">
            <Avatar url={response.document.avatar.url} size={35} />
            <h2>{response.document.userName}</h2>
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
            {showEmojis && (
              <EmojiPicker
                emojiStyle="native"
                onEmojiClick={handleEmojiClick}
                width="95%"
              />
            )}

            <div className="ImageInfoPanel__info__form__emoji">
              <button
                type="button"
                className="btn"
                onClick={() => setShowEmojis(oldValue => !oldValue)}
              >
                <MdSentimentSatisfiedAlt size={25} color="var(--gray)" />
              </button>
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
                <MdOutlineLocationOn size={25} color="var(--black)" />
              </span>
            </label>

            <div className="ImageInfoPanel__info__form__dropdown">
              <header
                onClick={() => setShowAccessibility(oldValue => !oldValue)}
              >
                <h3>Accessibility</h3>
                <span>
                  {showAccessibility ? (
                    <MdExpandLess size={25} color="var(--black)" />
                  ) : (
                    <MdExpandMore size={25} color="var(--black)" />
                  )}
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
                  {showAdvanceSettings ? (
                    <MdExpandLess size={25} color="var(--black)" />
                  ) : (
                    <MdExpandMore size={25} color="var(--black)" />
                  )}
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
