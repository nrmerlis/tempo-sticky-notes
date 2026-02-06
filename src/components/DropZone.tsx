import { useMemo, type CSSProperties, type ReactNode, type RefObject } from "react";

type DropZonePosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

interface DropZoneProps {
    ref: RefObject<HTMLDivElement | null>;
    children: ReactNode;
    position?: DropZonePosition;
}

const positionStyles: Record<DropZonePosition, CSSProperties> = {
    'bottom-right': { bottom: 10, right: 10 },
    'bottom-left': { bottom: 10, left: 10 },
    'top-right': { top: 10, right: 10 },
    'top-left': { top: 10, left: 10 },
};

const baseStyle: CSSProperties = {
    position: "fixed",
    width: "fit-content",
    height: "fit-content",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 0 10px 0 #B1BFCF",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

export const DropZone = ({ ref, children, position = 'bottom-right' }: DropZoneProps) => {
    const dropZoneStyle = useMemo<CSSProperties>(() => ({
        ...baseStyle,
        ...positionStyles[position],
    }), [position]);

    return (
        <div ref={ref} style={dropZoneStyle}>
            {children}
        </div>
    );
};
