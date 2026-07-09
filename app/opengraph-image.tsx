import { ImageResponse } from "next/og"

export const alt =
  "Shubham Mazumder - Founding engineer focused on the operational layer of AI products."
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#171614",
          color: "#ede8dc",
          padding: "72px 80px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            color: "#b8b0a2",
            fontSize: 28,
          }}
        >
          <span>Shubham Mazumder</span>
          <span>shubh.ink</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 920,
          }}
        >
          <div
            style={{
              width: 920,
              height: 1,
              background: "rgba(237, 232, 220, 0.2)",
            }}
          />
          <h1
            style={{
              margin: 0,
              fontSize: 72,
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: 0,
            }}
          >
            Founding engineer focused on the operational layer of AI products.
          </h1>
        </div>
      </div>
    ),
    size,
  )
}
