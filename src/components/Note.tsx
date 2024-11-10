import { HTMLComponent } from "./HTMLComponent";

interface Props {
    name: string;
    onClick: (url: string) => void;
}

export function Note({ name, onClick }: Props) {
    return (
        <div className="note"
            style={{
                scrollSnapAlign: "start",
                scrollSnapStop: "always",
                display: "flex",
                background: "#004455",
                minHeight: 100,
                height: "fit-content", // Take as much height as needed
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Optional: subtle shadow
            }}
        >
            <HTMLComponent fileKey={name} onLinkClick={onClick} />
        </div>
    );
}
