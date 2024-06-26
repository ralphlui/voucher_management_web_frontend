export const redeemCampaignsClaimVouchers = async (
  campaign: { campaignId: string },
  claimedBy: { email: string }
) => {
  const requestBody = {
    campaign,
    claimedBy,
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/voucher/claim`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
    const data = await res.json();
    return data;
  } catch {
    return { success: false, message: "Fetch data failed to redeem campaign." };
  }

};

export const fetchVouchersByCustomerEmail = async (useremail: string, page?: number, size?: number) => {
  const requestBody = {
    email: useremail,
  };

  let url = ""
  if (page != undefined) {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/voucher/getByEmail?page=${page}&size=${size}`
  } else {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/voucher/getByEmail`
  }
  const res = await fetch(
    `${url}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  const data = await res.json()
  return data;
};

export const consumeVoucherByCustomer = async (voucherId: string) => {
  const body = {
    voucherId
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/voucher/consume`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await res.json();
    return data;
  } catch {
    return { success: false, message: "Fetch data failed to consume voucher." };
  }


}

export const fetchVouchersByCampaignId = async (campaignId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/voucher/getByCampaignId/${campaignId}`
  )
  const data = await res.json()
  return data;
};

export const getVoucherListByCustomer = async () => {
  const res = await fetch(
    'https://65d15d72ab7beba3d5e44f21.mockapi.io/api/v1/stores/vouchers'
  )
  const data = await res.json()
  return data;
};
