import { DefaultApi } from "@algotia/client";

let client: DefaultApi | undefined;

const useClient = async (): Promise<DefaultApi> => {
    if (!client) {
        client = new DefaultApi();
    }
    try {
        await client.ping();
        return client;
    } catch (err) {
        throw new Error(
            "Cannot connect to server. Make sure that it is running."
        );
    }
};

export default useClient;
