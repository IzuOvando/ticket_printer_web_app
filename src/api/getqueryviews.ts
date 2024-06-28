import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { QueryViewRequest } from '@/app/test/schema';

dotenv.config();

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { userName } = req.query;
    if (req.method === 'GET') {
        try {
            const queryViews = await prisma.queryView.findMany({
                where: { userName: String(userName) }
            });
            const parsedQueryViews = queryViews.map((view: QueryViewRequest) => ({
                ...view,
                filters: JSON.parse(view.filters)
            }));
            res.status(200).json(parsedQueryViews);
        } catch (error: unknown) {
            const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
