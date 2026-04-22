import { Fragment } from "react";
import type { RichTextValue } from "../lib/rich-text";

export function RichText({ value }: { value: RichTextValue }) {
  const segments = typeof value === "string" ? [value] : value;

  return (
    <>
      {segments.map((segment, index) => {
        if (typeof segment === "string") {
          return <Fragment key={index}>{segment}</Fragment>;
        }

        if (segment.type === "strong") {
          return <strong key={index}>{segment.text}</strong>;
        }

        return <em key={index}>{segment.text}</em>;
      })}
    </>
  );
}
