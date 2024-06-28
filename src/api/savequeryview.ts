import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { filterName, filters, userName } = req.body;
        const filtersJson = JSON.stringify(filters);
        try {
            const queryView = await prisma.queryView.create({
                data: {
                    filterName,
                    filters: filtersJson,
                    userName
                }
            });
            res.status(200).json(queryView);
        } catch (error: unknown) {
            const errorMessage = (error as Error).message ?? 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}