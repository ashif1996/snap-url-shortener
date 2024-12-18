const sendResponse = (res, {
    statusCode,
    success = false,
    message,
    data = null,
}) => {
    return res.status(statusCode).json({
        success,
        message,
        data,
    });
};

export default sendResponse;