import type {Placement as PlacementType} from '@floating-ui/core';
import {useFloating} from '@floating-ui/react-dom';
import {allPlacements} from '../utils/allPlacements';
import {useLayoutEffect, useState} from 'react';
import {Controls} from '../utils/Controls';
import {useSize} from '../utils/useSize';

export function Placement() {
  const [placement, setPlacement] = useState<PlacementType>('bottom');
  const {x, y, reference, floating, strategy, update} = useFloating({
    placement,
  });
  const [size, handleSizeChange] = useSize();

  useLayoutEffect(update, [size, update]);

  return (
    <>
      <h1>Placement</h1>
      <p>
        The floating element should be correctly positioned when given each of
        the 12 placements.
      </p>
      <div className="container">
        <div ref={reference} className="reference">
          Reference
        </div>
        <div
          ref={floating}
          className="floating"
          style={{
            position: strategy,
            top: y ?? '',
            left: x ?? '',
            width: size,
            height: size,
          }}
        >
          Floating
        </div>
      </div>

      <Controls>
        <label htmlFor="size">Size</label>
        <input
          id="size"
          type="range"
          min="1"
          max="200"
          value={size}
          onChange={handleSizeChange}
        />
      </Controls>

      <Controls>
        {allPlacements.map((localPlacement) => (
          <button
            key={localPlacement}
            data-testid={`placement-${localPlacement}`}
            onClick={() => setPlacement(localPlacement)}
            style={{
              backgroundColor: localPlacement === placement ? 'black' : '',
            }}
          >
            {localPlacement}
          </button>
        ))}
      </Controls>
    </>
  );
}
