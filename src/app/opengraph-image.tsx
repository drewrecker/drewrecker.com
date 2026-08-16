import { ImageResponse } from "next/og";
import { profile } from "@/content/resume";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.title}`;

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#08090b",
          padding: "80px",
          color: "#f2f5f8",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#4ee2b5",
          }}
        >
          Mission Systems · Flight Test
        </div>
        <div style={{ fontSize: 118, fontWeight: 700, marginTop: 28 }}>
          {profile.name}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#b9c0ca",
            marginTop: 28,
            maxWidth: 940,
            lineHeight: 1.4,
          }}
        >
          {profile.title}
        </div>
        <div
          style={{
            marginTop: 48,
            height: 6,
            width: 200,
            background: "#4ee2b5",
            display: "flex",
          }}
        />
      </div>
    ),
    size,
  );
}
