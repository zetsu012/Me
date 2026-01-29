/**
 * Cloudflare Pages Function to fetch journey data from D1 database
 * Available at: /api/journey
 */

export async function onRequest(context) {
  const { env, request } = context;
  
  // Handle CORS for local development
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Query all journey items ordered by event_date (newest first)
    const { results } = await env.DB.prepare(
      'SELECT * FROM journey ORDER BY event_date DESC'
    ).all();

    // Transform database results to match the frontend data structure
    const journeyItems = results.map(row => {
      const eventDate = new Date(row.event_date);
      const year = eventDate.getFullYear();
      const currentYear = new Date().getFullYear();
      
      return {
        date: formatDate(row.event_date),
        subDate: null,
        title: row.title,
        company: null,
        description: row.description,
        fullContent: row.description,
        isCurrent: year === currentYear,
        isFuture: year > currentYear,
        tags: row.tags ? row.tags.split(',').map(t => t.trim()) : [],
        projects: null,
        logs: null,
      };
    });

    return new Response(
      JSON.stringify({ items: journeyItems }),
      { 
        headers: {
          ...corsHeaders,
          'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        }
      }
    );

  } catch (error) {
    console.error('Error fetching journey data:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch journey data',
        message: error.message 
      }),
      { 
        status: 500,
        headers: corsHeaders
      }
    );
  }
}

/**
 * Format SQL date to display format
 */
function formatDate(sqlDate) {
  if (!sqlDate) return '';
  
  const date = new Date(sqlDate);
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' });
  
  // Return formats like "Jan 2026" or "2020 - 2024" based on your needs
  return `${month} ${year}`;
}
