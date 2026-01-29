import { ref, onMounted } from 'vue';

/**
 * Composable to fetch journey data from Cloudflare D1 via API
 * Returns journey items with loading and error states
 */
export function useJourneyData() {
  const journeyItems = ref([]);
  const isLoading = ref(true);
  const error = ref(null);

  const fetchJourneyData = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch('/api/journey');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch journey data: ${response.statusText}`);
      }

      const data = await response.json();
      journeyItems.value = data.items || [];
      
    } catch (err) {
      error.value = err.message;
      console.error('Error fetching journey data:', err);
      
      // Fallback to empty array on error
      journeyItems.value = [];
      
    } finally {
      isLoading.value = false;
    }
  };

  // Fetch data when composable is used
  onMounted(() => {
    fetchJourneyData();
  });

  return {
    journeyItems,
    isLoading,
    error,
    refetch: fetchJourneyData
  };
}
