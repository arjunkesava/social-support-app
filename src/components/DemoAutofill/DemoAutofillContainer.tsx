import React from "react";

import { DemoAutofill } from "./DemoAutofill";
import { useDemoAutofill } from "./useDemoAutofill";

export const DemoAutofillContainer: React.FC = () => {
  const viewProps = useDemoAutofill();

  return <DemoAutofill {...viewProps} />;
};

export default DemoAutofillContainer;
