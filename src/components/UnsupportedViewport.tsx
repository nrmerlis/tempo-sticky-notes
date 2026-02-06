import type { CSSProperties } from "react";

const containerStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    padding: 20,
    textAlign: "center",
};

export const UnsupportedViewport = () => {
    return (
        <div style={containerStyle}>
            <h1>Screen size not supported</h1>
            <p>
                This application requires a minimum screen resolution of <strong>1024×768</strong> pixels. 
                Please resize your browser window or use a device with a larger screen.
            </p>
        </div>
    );
};
