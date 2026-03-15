import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#003A8F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Vertical bar of the cross */}
        <div
          style={{
            position: "absolute",
            width: 7,
            height: 22,
            borderRadius: 4,
            background: "#00B050",
          }}
        />
        {/* Horizontal bar of the cross */}
        <div
          style={{
            position: "absolute",
            width: 22,
            height: 7,
            borderRadius: 4,
            background: "#00B050",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
