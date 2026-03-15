import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Adena Occupational Health and Safety Center";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0F172A",
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background accent blobs */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(0, 58, 143, 0.35)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -80,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "rgba(0, 176, 80, 0.2)",
          }}
        />

        {/* Content wrapper */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "72px 80px",
            position: "relative",
          }}
        >
          {/* Top: logo mark + wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Logo mark — green cross on blue pill */}
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "#003A8F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {/* Vertical bar */}
              <div style={{ display: "flex", position: "absolute", width: 14, height: 40, borderRadius: 8, background: "#00B050" }} />
              {/* Horizontal bar */}
              <div style={{ display: "flex", position: "absolute", width: 40, height: 14, borderRadius: 8, background: "#00B050" }} />
            </div>
            {/* Wordmark */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, letterSpacing: -0.5 }}>
                Adena
              </span>
              <span style={{ color: "#00B050", fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
                Occupational Health &amp; Safety Center
              </span>
            </div>
          </div>

          {/* Middle: headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(0, 176, 80, 0.15)",
                border: "1px solid rgba(0, 176, 80, 0.4)",
                borderRadius: 100,
                padding: "8px 20px",
                alignSelf: "flex-start",
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00B050" }} />
              <span style={{ color: "#00B050", fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>
                DOSHS RECOGNIZED CENTER · MOMBASA, KENYA
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", fontSize: 64, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1 }}>
              <span style={{ color: "#FFFFFF" }}>Leading The Way To&nbsp;</span>
              <span style={{ color: "#3B82F6" }}>Safer Workplaces</span>
            </div>
          </div>

          {/* Bottom: tagline + divider */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ width: 60, height: 4, background: "#003A8F", borderRadius: 4 }} />
            <div style={{ display: "flex", gap: 40 }}>
              {[
                "Pre-employment Screening",
                "Occupational Surveillance",
                "Wellness Programs",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00B050", flexShrink: 0 }} />
                  <span style={{ color: "#94A3B8", fontSize: 18, fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
