export const getVignette = value => {
  if (value === 0) return null;
  return { boxShadow: `inset 0px 0px ${value}px black` };
};

export const getTemperature = value => {
  if (value < 0) return { backgroundColor: `rgba(0,0,${value},0.25)` };
  else if (value > 0)
    return { backgroundColor: `rgba(${value},${value},0,0.25)` };
  else return null;
};

export const getFade = value => {
  if (value > 0)
    return { backgroundColor: `rgba(255,255,255,${value / 100 / 2})` };
  else if (value < 0)
    return { backgroundColor: `rgba(0,0,0,${value / 100 / 2})` };
  else return null;
};
