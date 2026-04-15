"use client";

import { useEffect } from "react";
import CVContent from "../../components/CVContent";

const PDF_FILE_NAME = "CV - Patrik Dinh";

export default function CVPrintView() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PDF_FILE_NAME;

    const timeoutId = window.setTimeout(() => {
      window.print();
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
      document.title = previousTitle;
    };
  }, []);

  return <CVContent mode="print" />;
}
