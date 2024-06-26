
export async function registerUser(email: string, username: string, password: string, role: string, image?: File) {
    let formData = new FormData();
    const blob = new Blob([JSON.stringify({

        email,
        username,
        password,
        role

    })], {
        type: "application/json"
    })

    formData.append('user', blob);
    if (image != null) {
        formData.append("image", image);
    }

    
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/create`,
            {
                method: 'POST',
                body: formData

            });
        const result = await response.json();
        return result;
    } catch {
        return { message: "Fetch data failed", result: [] };
    }

}

export async function forgotPassword(email: string, password: string) {

    let body = {
        email,
        password
    }

    const headers = {
        'Content-Type': 'application/json'
    };

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/resetPassword`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)

        });

    const result = await response.json();
    return result;
}

export async function loginUser(email: string, password: string) {
    let body = {
        email,
        password
    }

    const headers = {
        'Content-Type': 'application/json'
    };
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/login`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)

        });

    const result = await response.json();
    return result;
}

export const verifyUser = async (verifyId: string) => {

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/verify?verifyid=${verifyId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const data = await res.json();
    return data;
};
