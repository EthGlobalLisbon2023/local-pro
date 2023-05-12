import {Task, WalletMapping} from "./models";

export const tasksMockData: Task[] = [
    {
        id: 1,
        location: {
            lat: 40.7829, // Central Park, New York
            lng: -73.9654
        },
        start_ts_utc: new Date('2023-05-01T10:00:00Z')
    },
    {
        id: 2,
        location: {
            lat: 34.1184, // Griffith Observatory, Los Angeles
            lng: -118.3004
        },
        start_ts_utc: new Date('2023-05-02T12:00:00Z')
    },
    {
        id: 3,
        location: {
            lat: 41.8917, // Navy Pier, Chicago
            lng: -87.6086
        },
        start_ts_utc: new Date('2023-05-03T14:00:00Z')
    },
];

export const walletMappingsMockData: WalletMapping[] = [
    {
        id: 1,
        polygon_id_wallet_address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
        safe_wallet_address: '0x6E857Ac6ff56DBd4e4c1f8236B22B31A3Bca9a3B',
        zk_bob_wallet_address: '0x6E857Ac6ff56DBd4e4c1f8236B22B31A3Bca9a3B',
    },
    {
        id: 2,
        polygon_id_wallet_address: '0x7eD1E469fCb3EE19C0366D829e291451bE638E59',
        safe_wallet_address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
        zk_bob_wallet_address: '0x6E857Ac6ff56DBd4e4c1f8236B22B31A3Bca9a3B',
    },
    {
        id: 3,
        polygon_id_wallet_address: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
        safe_wallet_address: '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db',
        zk_bob_wallet_address: '0x6E857Ac6ff56DBd4e4c1f8236B22B31A3Bca9a3B',
    },
];
