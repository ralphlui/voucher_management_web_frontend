export const fetchAllActiveFeedListByCustomer = async (email: string) => {
    console.log("Printing fetchAllActiveFeedListByCustomer api call : ");
    const requestBody = {
        email
    };

    console.log("Printing fetchAllActiveFeedListByCustomer api json request : ", JSON.stringify(requestBody));
    const res = await fetch(
        `${process.env.backendAPIURL}/api/feed/getAllByEmail`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })

    console.log("Printing fetchAllActiveFeedListByCustomer api  response : ", res);   
    const data = await res.json()
    console.log("Printing fetchAllActiveFeedListByCustomer api json response : ", data);   
    return data;
}