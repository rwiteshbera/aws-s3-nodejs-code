const { S3Client, CreateBucketCommand } = require("@aws-sdk/client-s3");
const { S3SyncClient, TransferMonitor } = require("s3-sync-client");

const client = new S3Client({
  region: "us-west-2",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});
const { sync } = new S3SyncClient({ client: client });

const monitor = new TransferMonitor();
monitor.on("progress", (progress) => {
  console.log(progress);
});

setInterval(() => {
  (async () => {
    try {
      await sync("./data", "s3://<bucket_name>", {
        del: true,
        maxConcurrentTransfers: 10,
        monitor,
      });
      console.log(monitor.getStatus());
    } catch (e) {
      console.log("errror" + e);
    } finally {
    }
  })();
}, 2000);
