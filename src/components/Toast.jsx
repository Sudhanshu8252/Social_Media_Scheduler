import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timeout);
    }, [onClose]);

    return <div className={`toast toast-${type} show`}>{message}</div>;
};

export default Toast;
