import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow in development mode
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ error: 'Not available in production' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name, image } = req.body;

    // Upsert user in database
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        image,
      },
      create: {
        email,
        name,
        image,
        role: (process.env.ALLOW_ADMIN_USER_CREATION === 'true' || req.body.isAdmin === true) ? 'ADMIN' : 'USER', // Only assign admin if explicitly allowed
      },
    });

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error initializing dev user:', error);
    res.status(500).json({ error: 'Failed to initialize user' });
  }
}
