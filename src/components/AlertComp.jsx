import { Alert } from "flowbite-react";

export default function AlertComp({ alert, onDismiss }) {
    if (!alert.show) return null;

    const colors = {
        success: "bg-green-50 text-green-800 border-green-200",
        error: "bg-red-50 text-red-800 border-red-200",
        info: "bg-blue-50 text-blue-800 border-blue-200",
        warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    };

    return (
        <div className="fixed top-40 right-5 transform -translate-x-1/6 z-50 w-full max-w-md animate-slide-down">
            <Alert
                color={alert.type}
                onDismiss={onDismiss}
                className={`shadow-lg rounded-xl border ${colors[alert.type]}`}
            >
                <span className="font-medium text-sm">{alert.message}</span>
            </Alert>
        </div>
    );
}