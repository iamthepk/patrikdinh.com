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
    src: "/thumbnails/print-agent/receipt-payload-contract.svg",
    lightSrc: "/thumbnails/print-agent/receipt-payload-contract-light.svg",
    label: "Receipt task",
    modalTitle: "Receipt task contract",
    modalAlt: "Print Agent receipt task contract preview",
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
    id: "kitchen-payload",
    src: "/thumbnails/print-agent/kitchen-payload-contract.svg",
    lightSrc: "/thumbnails/print-agent/kitchen-payload-contract-light.svg",
    label: "Kitchen task",
    modalTitle: "Kitchen task contract",
    modalAlt: "Print Agent kitchen task contract preview",
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
    src: "/thumbnails/print-agent/capabilities-contract.svg",
    lightSrc: "/thumbnails/print-agent/capabilities-contract-light.svg",
    label: "Capabilities",
    modalTitle: "Health and capability check",
    modalAlt: "Print Agent health and capability check preview",
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
    src: "/thumbnails/print-agent/print-result-contract.svg",
    lightSrc: "/thumbnails/print-agent/print-result-contract-light.svg",
    label: "Print result",
    modalTitle: "Print result contract",
    modalAlt: "Print Agent print result contract preview",
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
