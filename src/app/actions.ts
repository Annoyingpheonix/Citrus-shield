'use server';

import { suggestOptimalServer } from '@/ai/flows/suggest-optimal-server';
import { servers, speedTestData, latencyData } from '@/lib/data';

export async function getOptimalServerSuggestion() {
  try {
    const suggestion = await suggestOptimalServer({
      serverLocations: servers.map((s) => s.name),
      speedTestData,
      latencyData,
    });
    return suggestion;
  } catch (error) {
    console.error('Error getting optimal server suggestion:', error);
    return {
        optimalServer: 'Error',
        reasoning: 'Could not get a suggestion from the AI. Please try again later.'
    }
  }
}
