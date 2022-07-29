import { MutableRefObject, useEffect } from 'react';

export function useOutsideClick(
  ref: MutableRefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(
    () => {
      const listener = (evt: MouseEvent | TouchEvent) => {
        const {target} = evt;

        if (!ref.current || (target instanceof Element && ref.current.contains(target))) {
          return;
        }

        handler();
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [ref, handler]
  );
}
