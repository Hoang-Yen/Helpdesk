export const SHEET_ID = "11hVAosYOttycnlSgUIBHCOyA6XS38-LVZib3qjeDB5k";

export async function getArticlesFromSheet() {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Sheet1`;
    const res = await fetch(url);

    if (!res.ok) {
      console.log('Sheet fetch failed:', res.status);
      return [];
    }

    const text = await res.text();
    // gviz/tq returns a string wrapped in a function call
    const jsonStr = text.substring(text.indexOf("(") + 1, text.lastIndexOf(")"));
    const json = JSON.parse(jsonStr);
    const rows = json.table?.rows || [];

    // Map sheet rows to Article type
    // Expected structure based on user prompt:
    // [0]: id, [2]: title, [3]: category, [4]: excerpt, [5]: content, [8]: related, [9]: updated
    return rows.slice(1).map((row: any, index: number) => {
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
        relatedArticleIds: c[8]?.v ? c[8].v.toString().split(',').map((t: string) => t.trim()).filter(Boolean) : [],
        lastUpdated: c[9]?.v?.toString() || new Date().toISOString().split('T')[0],
        isPopular: false
      };
    }).filter((article: any) => article.id && article.title);
  } catch (error) {
    console.error('Sheets error:', error);
    return [];
  }
}
