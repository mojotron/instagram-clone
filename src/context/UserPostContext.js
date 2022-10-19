import { useEffect } from 'react';
import { useCallback } from 'react';
import { createContext, useState } from 'react';
import { getFilter, getLayers } from '../utils/filterLayers';

export const UserPostContext = createContext();

const initialAdjustments = {
  brightness: '0',
  contrast: '0',
  saturation: '0',
  temperature: '0',
  fade: '0',
  vignette: '0',
};

const initialDimensions = {
  aspectRatio: { width: '100%', height: '100%' },
  zoomLevel: '1',
  position: { x: 0, y: 0 },
};

const initialPostInfo = {
  caption: '',
  location: '',
  disableLikes: false,
  disableComments: false,
};

export const UserPostContextProvider = ({ children }) => {
  const [currentStage, setCurrentStage] = useState('choose-files');

  // files
  const [files, setFiles] = useState(null);
  const [tempImageUrls, setTempImageUrls] = useState([]);
  // dimensions
  const [dimensions, setDimensions] = useState(null);
  // image data
  const [imagesData, setImagesData] = useState(null);
  // post info
  const [postInfo, setPostInfo] = useState(null);

  console.log(currentStage);
  console.log(files);

  const setup = useCallback(() => {
    setTempImageUrls([...files].map(file => URL.createObjectURL(file)));
    setDimensions({ ...initialDimensions });
    setImagesData(
      [...files].map(file => ({
        url: URL.createObjectURL(file),
        alt: '',
        // for edit panel
        imageAdjustments: { ...initialAdjustments },
        // for post image
        filter: '',
        layers: [],
        // for active filter
        filterName: 'original',
      }))
    );
    setPostInfo({ ...initialPostInfo });
    setCurrentStage('set-dimensions');
  }, [files]);

  console.log(dimensions);

  useEffect(() => {
    console.log('here is UE');
    if (files === null) return;
    console.log('GOOOOOOOOOO');
    setup();
  }, [files, setup]);
  // if current stage is choose-files reset all other fields

  const addFile = fileList => {
    const newFileList = new DataTransfer();
    [...files, ...fileList].forEach(file => newFileList.items.add(file));
    setFiles(newFileList.files);
  };

  const deleteFile = index => {
    const newFileList = new DataTransfer();
    [...files].forEach((file, i) => {
      if (i !== index) newFileList.items.add(file);
    });
    if (newFileList.files.length === 0) setFiles(null);
    else setFiles(newFileList.files);
  };

  const reorderFiles = newIndexes => {
    const newFileList = new DataTransfer();
    newIndexes
      .map(index => files.item(index))
      .forEach(file => newFileList.items.add(file));
    setFiles(newFileList.files);
  };

  const updateFiltersAndLayers = () => {
    setImagesData(oldData => {
      const temp = oldData.map(ele => ({
        ...ele,
        filter: getFilter(
          ele.imageAdjustments.brightness,
          ele.imageAdjustments.contrast,
          ele.imageAdjustments.saturation
        ),
        layers: getLayers(
          ele.imageAdjustments.temperature,
          ele.imageAdjustments.fade,
          ele.imageAdjustments.vignette
        ),
      }));
      return temp;
    });
  };

  return (
    <UserPostContext.Provider
      value={{
        files,
        setFiles,
        tempImageUrls,
        addFile,
        deleteFile,
        reorderFiles,
        dimensions,
        setDimensions,
        currentStage,
        setCurrentStage,
        imagesData,
        setImagesData,
        updateFiltersAndLayers,
        postInfo,
        setPostInfo,
      }}
    >
      {children}
    </UserPostContext.Provider>
  );
};
