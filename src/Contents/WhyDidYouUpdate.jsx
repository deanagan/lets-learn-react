import { useLayoutEffect, useState } from "react";

import { WhyDidYouUpdateDemo } from "../Demo/WhyDidYouUpdateDemo";

export default function WhyDidYouUpdate({ slideIndex, slideOrder }) {
  const [showComponent, setShowComponent] = useState(false);

  useLayoutEffect(() => {
    if (slideIndex.h === slideOrder) {
      setShowComponent(true);
    } else {
      setShowComponent(false);
    }
  }, [slideIndex.h, slideOrder]);

  return (
    <section>
      <h4>Why Did You Update Demo</h4>
      {showComponent ? <WhyDidYouUpdateDemo /> : null}
    </section>
  );
}
