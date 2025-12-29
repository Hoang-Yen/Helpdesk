export const SHEET_ID = "11hVAosYOttycnlSgUIBHCOyA6XS38-LVZib3qjeDB5k";

export async function getArticlesFromSheet() {
  try {
    // Call our backend API proxy instead of directly calling Google Sheets
    // This bypasses CORS issues since server-to-server requests don't have CORS restrictions
    const res = await fetch('/api/sync-sheets');

    if (!res.ok) {
      console.log('API fetch failed:', res.status);
      return [];
    }

    const data = await res.json();
    const articles = data.data || [];

    return articles;
  } catch (error) {
    console.error('Sheets error:', error);
    return [];
  }
}
