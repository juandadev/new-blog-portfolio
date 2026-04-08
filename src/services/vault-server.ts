import { VaultData } from '@/types/vault';
import { vaultData } from '@/data/vault-data';

export async function fetchVaultData(): Promise<VaultData> {
  return vaultData;
}
