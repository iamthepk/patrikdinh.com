export const ANIMATION_DURATION_MS = 4500;
export const PAUSE_BEFORE_RESTART_MS = 3000;
export const SWIPE_DURATION_MS = 400;
export const PAUSE_AFTER_SWIPE_MS = 300;
export const TOTAL_CYCLE_TIME_MS =
  ANIMATION_DURATION_MS + PAUSE_BEFORE_RESTART_MS;

export type PrintAgentPreview = {
  id: string;
  src: string;
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
  connectorPath: string;
  connectorDelay: number;
};

export const PRINT_AGENT_PREVIEWS: PrintAgentPreview[] = [
  {
    id: "order",
    src: "/thumbnails/print-agent/order-thumbnail.png",
    label: "Order",
    modalTitle: "Order payload preview",
    modalAlt: "Print Agent order payload preview",
    x: 140,
    y: 630,
    width: 300,
    height: 200,
    imageX: 148,
    imageY: 638,
    imageWidth: 284,
    imageHeight: 184,
    delay: 0.8,
    connectorPath: "M290 630 L 400 350",
    connectorDelay: 1,
  },
  {
    id: "label-1",
    src: "/thumbnails/print-agent/label1-thumbnail.png",
    label: "Drink #1 label",
    modalTitle: "Drink label one preview",
    modalAlt: "Print Agent drink label one preview",
    x: 520,
    y: 630,
    width: 300,
    height: 200,
    imageX: 528,
    imageY: 638,
    imageWidth: 284,
    imageHeight: 184,
    delay: 2.8,
    connectorPath: "M670 630 C 860 620, 1600 500, 1300 395",
    connectorDelay: 3,
  },
  {
    id: "label-2",
    src: "/thumbnails/print-agent/label2-thumbnail.png",
    label: "Drink #2 label",
    modalTitle: "Drink label two preview",
    modalAlt: "Print Agent drink label two preview",
    x: 830,
    y: 630,
    width: 300,
    height: 200,
    imageX: 838,
    imageY: 638,
    imageWidth: 284,
    imageHeight: 184,
    delay: 2.9,
    connectorPath: "M980 630 C 1100 620, 1620 500, 1300 395",
    connectorDelay: 3.1,
  },
  {
    id: "receipt",
    src: "/thumbnails/print-agent/receipt-thumbnail.png",
    label: "Receipt",
    modalTitle: "Receipt preview",
    modalAlt: "Print Agent receipt preview",
    x: 1210,
    y: 630,
    width: 300,
    height: 200,
    imageX: 1218,
    imageY: 638,
    imageWidth: 284,
    imageHeight: 184,
    delay: 3,
    connectorPath: "M1360 630 C 1550 600, 1620 360, 1500 235",
    connectorDelay: 3.2,
  },
];
