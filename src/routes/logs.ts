import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

/**
 * GET /api/logs
 * Query: from=ISODate&to=ISODate
 */
router.get('/api/logs', async (req, res) => {
  const from = req.query.from as string;
  const to   = req.query.to   as string;
  if (!from || !to) {
    return res.status(400).json({ error: 'Missing from/to query parameters' });
  }

  try {
    const logs = await prisma.log.findMany({
      where: {
        timestamp: { gte: new Date(from), lte: new Date(to) }
      },
      orderBy: { timestamp: 'desc' },
      take: 1000
    });
    res.json({ data: logs });
  } catch (err: any) {
    console.error('Fetch logs error', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
