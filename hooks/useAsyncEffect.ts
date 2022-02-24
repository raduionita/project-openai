import {useEffect} from "react";

export const useAsyncEffect = (didUpdate:()=>unknown,deps:ReadonlyArray<any>) => {
  useEffect(() => {
    let isUnmounted = false;
    (async () => {
      if (isUnmounted) return;
      // else
      didUpdate();
    })().catch(err => console.log(err));
    return () => { isUnmounted = true; }
  }, deps);
}
