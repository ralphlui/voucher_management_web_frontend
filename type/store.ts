export type StoreDetailProps =  {
    storeID: string;
    storeName: string;
    storeDesc: string;
    storeAddress: string;
    storeCreatedDate: string;
}

export type StoreCard = {
    store: StoreDetailProps;
}