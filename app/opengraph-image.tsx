import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Patrik Dinh — Full-stack developer building internal systems, automation and AI tools for real-world use.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          background: "#050505",
          color: "#f5f5f5",
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(255,255,255,0.12), transparent 34%), radial-gradient(circle at bottom right, rgba(255,255,255,0.08), transparent 30%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 40,
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 28,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 26,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <div style={{ display: "flex" }}>patrikdinh.com</div>
            <div style={{ display: "flex" }}>Portfolio</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 920,
              gap: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 88,
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.05em",
              }}
            >
              Patrik Dinh
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 38,
                lineHeight: 1.2,
                color: "rgba(255,255,255,0.9)",
                maxWidth: 900,
              }}
            >
              Full-stack developer building internal systems, automation and AI
              tools for real-world use.
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                marginTop: 10,
              }}
            >
              {[
                "Internal tools",
                "Automation",
                "AI workflows",
                "Production systems",
              ].map((label) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    padding: "10px 16px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.04)",
                    fontSize: 22,
                    color: "rgba(255,255,255,0.82)",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                color: "rgba(255,255,255,0.62)",
                fontSize: 24,
              }}
            >
              <div style={{ display: "flex" }}>Full-stack · TypeScript · AI</div>
              <div style={{ display: "flex" }}>Case-study driven portfolio</div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 24,
                color: "rgba(255,255,255,0.72)",
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: "#7bf1a8",
                  boxShadow: "0 0 24px rgba(123, 241, 168, 0.65)",
                }}
              />
              <div style={{ display: "flex" }}>Ready to work</div>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
