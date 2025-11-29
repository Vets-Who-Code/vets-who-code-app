import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

/**
 * Dev-only endpoint to create a mock session
 * Only works in development mode
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ error: 'Not available in production' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Find or create dev user
    let user = await prisma.user.findUnique({
      where: { email: email || 'jerome@vetswhocode.io' },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email || 'jerome@vetswhocode.io',
          name: 'Jerome Hardaway (Dev)',
          role: 'ADMIN',
        },
      });
    }

    // Create session in database
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        sessionToken: `dev-session-${Date.now()}`,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    // Set session cookie
    res.setHeader(
      'Set-Cookie',
      `next-auth.session-token=${session.sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`
    );

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error creating dev session:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
