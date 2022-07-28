import { MutableRefObject, useEffect } from 'react';

export function useOnClickOutside(
  ref: MutableRefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(
    () => {
      const listener = (target: EventTarget | null) => {
        if (!ref.current || (target instanceof Element && ref.current.contains(target))) {
          return;
        }

        handler();
      };
      document.addEventListener('mousedown', (evt) => listener(evt.target));
      document.addEventListener('touchstart', (evt) => listener(evt.target));

      return () => {
        document.removeEventListener('mousedown', (evt) => listener(evt.target));
        document.removeEventListener('touchstart', (evt) => listener(evt.target));
      };
    },
    [ref, handler]
  );
}
