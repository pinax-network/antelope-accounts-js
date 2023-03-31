import { createPromiseClient, PromiseClient } from "@bufbuild/connect";
import { createConnectTransport } from "@bufbuild/connect-node";

import { Kv } from "./generated/read_connect";
import { Account } from "./generated/accounts_pb";

interface ClientParams {

}

interface OriginInfo {
    account: string;
    creator: string;
    created_at: string;
    keys: string[];
    trx_id: string;
    bytes: number;
};

const CreatorInfoCache: {[key: string]: OriginInfo} = {};

export function createClient(baseUrl: string, params: ClientParams = {}): AntelopeAccountsClient {
    return new AntelopeAccountsClient(baseUrl, params);
}

class AntelopeAccountsClient {
    private baseUrl: string;
    private client: PromiseClient<typeof Kv>;

    constructor(baseUrl: string, params: ClientParams) {
        this.baseUrl = baseUrl;
        const transport = createConnectTransport({
            httpVersion: "2",
            baseUrl: this.baseUrl,
            nodeOptions: { },
        });
        this.client = createPromiseClient(Kv, transport);
    }

    public async getOrigin(account: string): Promise<OriginInfo> {
        if (!account) throw new Error("Invalid account name");
        if (CreatorInfoCache[account]) return CreatorInfoCache[account];

        const response = await this.client.get({
            key: account,
        });
        try {
            const data = Account.fromBinary(response.value);
            CreatorInfoCache[account] = {
                account: account,
                creator: data.creator?.creator ?? "",
                created_at: data.timestamp?.toDate().toISOString() ?? "",
                keys: [... new Set([
                    ...(data.owner?.keys.map((key) => key.publicKey) ?? []),
                    ...(data.active?.keys.map((key) => key.publicKey) ?? []),
                ])],
                trx_id: data.trxId,
                bytes: data.ramBytes,
            }
        } catch (err: any) {
            throw new Error("Failed to parse account data: " + err?.message);
        }

        return CreatorInfoCache[account]
    }

    public async getOrigins(accounts: string[]): Promise<OriginInfo[]> {
        if (!accounts) throw new Error("Invalid account list");

        const response = await this.client.getMany({
            keys: accounts,
        });
        return response.values.map((value) => {
            const account = Account.fromBinary(value);
            return {
                account: account.name,
                creator: account.creator?.creator ?? "",
                created_at: account.timestamp?.toDate().toISOString() ?? "",
                keys: [... new Set([
                    ...(account.owner?.keys.map((key) => key.publicKey) ?? []),
                    ...(account.active?.keys.map((key) => key.publicKey) ?? []),
                ])],
                trx_id: account.trxId,
                bytes: account.ramBytes,
            }
        });
    }
}

