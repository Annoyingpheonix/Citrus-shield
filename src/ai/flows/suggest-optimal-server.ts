'use server';

/**
 * @fileOverview A flow to suggest the optimal VPN server location based on speed tests and latency.
 *
 * - suggestOptimalServer - A function that suggests the optimal server location.
 * - SuggestOptimalServerInput - The input type for the suggestOptimalServer function.
 * - SuggestOptimalServerOutput - The return type for the suggestOptimalServer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalServerInputSchema = z.object({
  serverLocations: z
    .array(z.string())
    .describe('An array of available VPN server locations.'),
  speedTestData: z
    .record(z.number())
    .describe(
      'A record of speed test data for each server location, with the location as the key and the speed as the value (in Mbps).' // Changed to Mbps for clarity
    ),
  latencyData: z
    .record(z.number())
    .describe(
      'A record of latency data for each server location, with the location as the key and the latency as the value (in ms).' // Changed to ms for clarity
    ),
});

export type SuggestOptimalServerInput = z.infer<typeof SuggestOptimalServerInputSchema>;

const SuggestOptimalServerOutputSchema = z.object({
  optimalServer: z.string().describe('The suggested optimal VPN server location.'),
  reasoning: z
    .string()
    .describe(
      'The AI reasoning behind the server selection, including speed and latency considerations.'
    ),
});

export type SuggestOptimalServerOutput = z.infer<typeof SuggestOptimalServerOutputSchema>;

export async function suggestOptimalServer(
  input: SuggestOptimalServerInput
): Promise<SuggestOptimalServerOutput> {
  return suggestOptimalServerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalServerPrompt',
  input: {schema: SuggestOptimalServerInputSchema},
  output: {schema: SuggestOptimalServerOutputSchema},
  prompt: `You are a network performance analyst for a top-tier VPN service. Your task is to recommend the optimal server for a user to connect to.

You will be given a list of available server locations, along with their latest speed test results (in Mbps) and latency measurements (in ms).

Your analysis should prioritize a balance between high speed and low latency. A very high-speed server with high latency might be worse for general browsing than a slightly slower server with much lower latency.

Analyze the provided data:
- Available Servers: {{serverLocations}}
- Speed Tests (Mbps): {{speedTestData}}
- Latency (ms): {{latencyData}}

Based on your analysis, provide the following:
1.  **optimalServer**: The name of the single best server location to connect to.
2.  **reasoning**: A concise explanation for your choice. Explain the trade-offs you considered. For example, mention why the chosen server is better than another strong candidate (e.g., "While Frankfurt has the highest speed, New York's significantly lower latency makes it better for a more responsive experience.").`,
});

const suggestOptimalServerFlow = ai.defineFlow(
  {
    name: 'suggestOptimalServerFlow',
    inputSchema: SuggestOptimalServerInputSchema,
    outputSchema: SuggestOptimalServerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
