import { maxMove, calcReposition } from '../repositionElement';

describe('reposition element helpers', () => {
  describe('maxMove', () => {
    test('zoom level 1 or lesser then one max move 0%', () => {
      expect(maxMove(1)).toBe(0);
      expect(maxMove(0.5)).toBe(0);
      expect(maxMove(-1)).toBe(0);
    });

    test('max zoom of 2 allow max move of half of child element 50%', () => {
      expect(maxMove(2)).toBe(50);
      expect(maxMove(3)).toBe(50);
      expect(maxMove(10)).toBe(50);
    });

    test('max move between min(1) and max(2) values in percentage', () => {
      expect(maxMove(1.05)).toBe(2.5);
      expect(maxMove(1.25)).toBe(12.5);
      expect(maxMove(1.34)).toBe(17);
      expect(maxMove(1.5)).toBe(25);
      expect(maxMove(1.62)).toBe(31);
      expect(maxMove(1.75)).toBe(37.5);
      expect(maxMove(1.97)).toBe(48.5);
    });
  });

  describe('calcReposition', () => {
    // moveStart => start position of mousemove (in px)
    // eventPosition => current mouse position (end position in px);
    // max zoom level 2 => (child is 100% bigger) => max move is half of that 50%
    // square rect
    const parentBoundingClientRect = {
      width: 100,
      height: 100,
      top: 0,
      left: 0,
    };

    test('move x by 10%', () => {
      // start position middle of square
      const moveStart = { x: 50, y: 50 };
      const eventPosition = { x: 40, y: 50 };
      const zoomLevel = 2;
      expect(
        calcReposition(
          eventPosition,
          parentBoundingClientRect,
          moveStart,
          zoomLevel
        )
      ).toEqual({ x: 10, y: 0 });
    });

    test('move y by -10%', () => {
      // start position middle of square
      const moveStart = { x: 50, y: 50 };
      const eventPosition = { x: 50, y: 60 };
      const zoomLevel = 2;
      expect(
        calcReposition(
          eventPosition,
          parentBoundingClientRect,
          moveStart,
          zoomLevel
        )
      ).toEqual({ x: 0, y: -10 });
    });

    test('move x and y by 25%', () => {
      // start position middle of square
      const moveStart = { x: 50, y: 50 };
      const eventPosition = { x: 25, y: 25 };
      const zoomLevel = 2;
      expect(
        calcReposition(
          eventPosition,
          parentBoundingClientRect,
          moveStart,
          zoomLevel
        )
      ).toEqual({ x: 25, y: 25 });
    });

    test('move to border', () => {
      // start position middle of square
      const moveStart = { x: 50, y: 50 };
      const eventPosition = { x: 50, y: 100 };
      const zoomLevel = 2;
      expect(
        calcReposition(
          eventPosition,
          parentBoundingClientRect,
          moveStart,
          zoomLevel
        )
      ).toEqual({ x: 0, y: -50 });
    });
    test('move beyond border', () => {
      // start position middle of square
      const moveStart = { x: 50, y: 50 };
      // border is 100
      const eventPosition = { x: 50, y: 200 };
      const zoomLevel = 2;
      expect(
        calcReposition(
          eventPosition,
          parentBoundingClientRect,
          moveStart,
          zoomLevel
        )
      ).toEqual({ x: 0, y: -50 });
    });
  });
});
