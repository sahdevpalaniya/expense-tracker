import React from 'react'

function Button({ type, loading, value }) {
    return (
        <>
            <button type={type} className="submit-btn" disabled={loading}>
                {loading ? value + '...' : value}
            </button>
        </>
    )
}

export default Button