export type RichTextToken = {
  type: "strong" | "em";
  text: string;
};

export type RichTextSegment = string | RichTextToken;
export type RichText = RichTextSegment[];
export type RichTextValue = string | RichText;

export function rich(...segments: RichTextSegment[]): RichText {
  return segments;
}

export function strong(text: string): RichTextToken {
  return { type: "strong", text };
}

export function em(text: string): RichTextToken {
  return { type: "em", text };
}
