// ---------------------------------------------------------------------------
// Job queue — pg-boss backed (uses existing Postgres, no extra service)
// ---------------------------------------------------------------------------

import PgBoss from "pg-boss";

let boss: PgBoss | null = null;

export async function getQueue(): Promise<PgBoss> {
  if (boss) return boss;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("Missing DATABASE_URL env var");

  boss = new PgBoss(connectionString);
  await boss.start();
  return boss;
}

// Enqueue a webhook processing job with idempotency
export async function enqueueWebhookJob(
  queueName: string,
  data: Record<string, unknown>,
  idempotencyKey: string,
) {
  const queue = await getQueue();
  return queue.send(queueName, data, {
    singletonKey: idempotencyKey, // Prevents duplicate processing
    retryLimit: 5,
    retryDelay: 30,              // seconds
    retryBackoff: true,          // Exponential backoff
    expireInMinutes: 60,
  });
}
