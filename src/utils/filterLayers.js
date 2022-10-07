const getTemperature = value => {
  if (value < 0) return { backgroundColor: `rgba(0,0,${value},0.25)` };
  else if (value > 0)
    return { backgroundColor: `rgba(${value},${value},0,0.25)` };
  else return null;
};

const getFade = value => {
  if (value > 0)
    return { backgroundColor: `rgba(255,255,255,${value / 100 / 2})` };
  else if (value < 0)
    return { backgroundColor: `rgba(0,0,0,${value / 100 / 2})` };
  else return null;
};

const getVignette = value => {
  if (value === 0) return null;
  return { boxShadow: `inset 0px 0px ${value}px black` };
};

const getFilterValue = value => parseInt(value) / 100 + 1;

export const getLayers = (temperature, fade, vignette) => {
  const temperatureLayer = getTemperature(temperature);
  const fadeLayer = getFade(fade);
  const vignetteLayer = getVignette(vignette);

  return [temperatureLayer, fadeLayer, vignetteLayer];
};

export const getFilter = (brightness, contrast, saturation) => {
  const brightnessValue = getFilterValue(brightness);
  const contrastValue = getFilterValue(contrast);
  const saturationValue = getFilterValue(saturation);

  return `brightness(${brightnessValue}) contrast(${contrastValue}) saturate(${saturationValue})`;
};
