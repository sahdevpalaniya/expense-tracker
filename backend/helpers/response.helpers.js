const resp = async (res, status, message, boolean = true, data = undefined) => {
    // Check if 'data' is an array and not empty
    if (data != undefined) {
        return res.status(status).json({ status: boolean, message: message, data: data });
    } else {
        return res.status(status).json({ status: boolean, message: message });
    }
};
module.exports = { resp };
