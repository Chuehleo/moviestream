import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const session = await getSession({ req });
    const currentUser = await serverAuth(req);

    if (!currentUser) {
      return res.status(401).end();
    }

    const { query } = req.query;

    const searchQuery = Array.isArray(query) ? query.join("") : query;

    const searchResults = await prismadb.movie.findMany({
      where: {
        title: {
          contains: searchQuery
        }
      }
    });

    return res.status(200).json(searchResults);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}