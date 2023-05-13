export interface Task {
    id: number;
    location: {
        lat: number;
        lng: number;
    };
    start_ts_utc: Date;
}

export interface WalletMapping {
    id: number;
    polygon_id_wallet_address: string;
    safe_wallet_address: string;
    zk_bob_wallet_address: string;
}