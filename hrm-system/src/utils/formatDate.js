export const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

export const formatTime = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const formatDateTime = (date) => {
    if (!date) return "—";
    return `${formatDate(date)} ${formatTime(date)}`;
};