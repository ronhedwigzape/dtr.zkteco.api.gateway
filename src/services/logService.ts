import { prisma } from '../prisma';
import { NormalizedEntry } from '../types';

export async function upsertLogs(entries: NormalizedEntry[]) {
  // upsert each entry to avoid duplicates
  await Promise.all(entries.map(e =>
    prisma.log.upsert({
      where: { id: e.id },
      create: {
        id: e.id,
        deviceId: e.deviceId,
        userId: e.userId,
        timestamp: new Date(e.timestamp),
        type: e.type,
        state: e.state,
        ip: e.ip
      },
      update: {} // no fields to update on conflict
    })
  ));
}
