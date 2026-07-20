export const ANIMATION_DURATION_MS = 4500;
export const PAUSE_BEFORE_RESTART_MS = 3000;
export const SWIPE_DURATION_MS = 400;
export const PAUSE_AFTER_SWIPE_MS = 300;
export const TOTAL_CYCLE_TIME_MS =
  ANIMATION_DURATION_MS + PAUSE_BEFORE_RESTART_MS;

export type PrintAgentPreview = {
  id: string;
  src: string;
  lightSrc: string;
  label: string;
  modalTitle: string;
  modalAlt: string;
  x: number;
  y: number;
  width: number;
  height: number;
  imageX: number;
  imageY: number;
  imageWidth: number;
  imageHeight: number;
  delay: number;
};

export const PRINT_AGENT_PREVIEWS: PrintAgentPreview[] = [
  {
    id: "receipt-payload",
    src: "/thumbnails/print-agent/receipt-payload-contract.png",
    lightSrc: "/thumbnails/print-agent/receipt-payload-contract-light.png",
    label: "Receipt payload",
    modalTitle: "Receipt API contract",
    modalAlt: "Print Agent receipt API contract preview",
    x: 95,
    y: 610,
    width: 315,
    height: 145,
    imageX: 103,
    imageY: 618,
    imageWidth: 299,
    imageHeight: 129,
    delay: 0.8,
  },
  {
    id: "sticker-payload",
    src: "/thumbnails/print-agent/sticker-payload-contract.png",
    lightSrc: "/thumbnails/print-agent/sticker-payload-contract-light.png",
    label: "Sticker payload",
    modalTitle: "Sticker API contract",
    modalAlt: "Print Agent sticker API contract preview",
    x: 462,
    y: 610,
    width: 315,
    height: 145,
    imageX: 470,
    imageY: 618,
    imageWidth: 299,
    imageHeight: 129,
    delay: 2.8,
  },
  {
    id: "capabilities",
    src: "/thumbnails/print-agent/capabilities-contract.png",
    lightSrc: "/thumbnails/print-agent/capabilities-contract-light.png",
    label: "Capabilities",
    modalTitle: "Print capability check",
    modalAlt: "Print Agent capability check preview",
    x: 829,
    y: 610,
    width: 315,
    height: 145,
    imageX: 837,
    imageY: 618,
    imageWidth: 299,
    imageHeight: 129,
    delay: 2.9,
  },
  {
    id: "print-result",
    src: "/thumbnails/print-agent/print-result-contract.png",
    lightSrc: "/thumbnails/print-agent/print-result-contract-light.png",
    label: "Print result",
    modalTitle: "Print result preview",
    modalAlt: "Print Agent print result preview",
    x: 1196,
    y: 610,
    width: 315,
    height: 145,
    imageX: 1204,
    imageY: 618,
    imageWidth: 299,
    imageHeight: 129,
    delay: 3,
  },
];
