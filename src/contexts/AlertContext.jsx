import { createContext, useState, useContext } from "react";

export const AlertContext = createContext();

export function AlertProvider({ children }) {
    const [alert, setAlert] = useState({
        show: false,
        type: "success",
        message: ""
    });

    const showAlert = (type, message) => {
        setAlert({ show: true, type, message });
        // Auto hide after 3 seconds
        setTimeout(() => {
            setAlert({ show: false, type: "success", message: "" });
        }, 3000);
    };

    const hideAlert = () => {
        setAlert({ show: false, type: "success", message: "" });
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
            {children}
        </AlertContext.Provider>
    );
}

// Custom hook untuk menggunakan alert
export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within AlertProvider");
    }
    return context;
};