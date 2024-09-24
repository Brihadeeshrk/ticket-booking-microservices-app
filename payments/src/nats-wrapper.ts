import nats from "node-nats-streaming";

class NatsWrapper {
  // optional because initially before connection, it maybe undefined
  private _client?: nats.Stan;

  // since _client is priv, we're going to use getters to get the client and then return some err if its undefined
  get client() {
    if (!this._client) {
      throw new Error("Cannot access NATS client before initialisation");
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((res, rej) => {
      this.client!.on("connect", () => {
        console.log("Connected to NATS 🚀");
        res();
      });
      this.client!.on("error", (err) => {
        console.error("❌ Error with NATS", err);
        rej(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
