import { Task, WalletMapping } from './models';
import { tasksMockData, walletMappingsMockData } from './mockData';



export const getTaskById = async (id: number): Promise<Task | null> => {
    const taskMapping = tasksMockData.find(mapping => mapping.id === id);
    return taskMapping || null;
}

export const getWalletMappingById = async (id: number): Promise<WalletMapping | null> => {
    const walletMapping = walletMappingsMockData.find(mapping => mapping.id === id);
    return walletMapping || null;
}
