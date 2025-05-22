import { Router } from 'express';
import { upsertLogs } from '../services/logService';
import { NormalizedEntry } from '../types';

const router = Router();

/**
 * POST /internal/ingest
 * Body: { entries: NormalizedEntry[] }
 */
router.post('/internal/ingest', async (req, res) => {
  const { entries } = req.body as { entries: NormalizedEntry[] };
  if (!Array.isArray(entries)) {
    return res.status(400).json({ error: 'Invalid payload: entries[] expected' });
  }
  try {
    await upsertLogs(entries);
    res.json({ ingested: entries.length });
  } catch (err: any) {
    console.error('Ingest error', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
