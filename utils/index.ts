import React from 'react'

export const isValidateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    return isValid;
}

export const hasWhiteSpace = (text: string) => {
    return /\s/g.test(text);
}