const handleError = async (err) => {
    const formattedErrors = {};
    for (const [key, value] of Object.entries(err.response.data.errors)) {
        formattedErrors[key] = value.map((errorMessage) => errorMessage.replace(/\"(.*?)\"/g, '$1')).join(", ");
    }
    return formattedErrors;
};

module.exports = {
    handleError
}
