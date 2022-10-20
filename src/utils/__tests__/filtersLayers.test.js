import { getLayers, getFilter } from '../filterLayers';

describe('Create css filter and layer overlay', () => {
  test('css filter', () => {
    const brightness = '25';
    const contrast = '50';
    const saturation = '75';
    expect(getFilter(brightness, contrast, saturation)).toBe(
      'brightness(1.25) contrast(1.5) saturate(1.75)'
    );
  });

  test('layers overlay array', () => {
    const temperature = '25';
    const fade = '50';
    const vignette = '75';
    expect(getLayers(temperature, fade, vignette)).toEqual([
      { backgroundColor: 'rgba(25,25,0,0.25)' },
      { backgroundColor: 'rgba(255,255,255,0.25)' },
      { boxShadow: 'inset 0px 0px 75px black' },
    ]);
  });
});
