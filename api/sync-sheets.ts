import type { VercelRequest, VercelResponse } from '@vercel/node';

const SHEET_ID = '11hVAosYOttycnlSgUIBHCOyA6XS38-LVZib3qjeDB5k';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Call Google Sheets gviz API from server (no CORS)
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Sheet1`;
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Google Sheets API error: ${response.statusText}`
      });
    }

    // Get response text
    const text = await response.text();

    // Extract JSON from gviz response format
    // gviz/tq returns: /**/google.visualization.Query.setResponse({...});
    const jsonStr = text.substring(
      text.indexOf('(') + 1,
      text.lastIndexOf(')')
    );

    const json = JSON.parse(jsonStr);
    const rows = json.table?.rows || [];

    // Map sheet rows to Article structure
    const articles = rows
      .slice(1) // Skip header
      .map((row: any, index: number) => {
        const c = row.c || [];
        return {
          id: c[0]?.v?.toString() || `article-${index + 1}`,
          title: c[2]?.v?.toString() || `Article ${index + 1}`,
          categoryId: c[3]?.v?.toString() || 'getting-started',
          excerpt: c[4]?.v?.toString() || '',
          sections: [
            {
              id: 'content-main',
              title: 'Content',
              content: c[5]?.v?.toString() || ''
            }
          ],
          relatedArticleIds: c[8]?.v
            ? c[8].v
                .toString()
                .split(',')
                .map((t: string) => t.trim())
                .filter(Boolean)
            : [],
          lastUpdated: c[9]?.v?.toString() || new Date().toISOString().split('T')[0],
          isPopular: false
        };
      })
      .filter((article: any) => article.id && article.title);

    return res.status(200).json({ data: articles });
  } catch (error) {
    console.error('Sheets sync error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
