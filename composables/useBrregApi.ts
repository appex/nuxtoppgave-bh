import type { brreg } from "~/types/brreg";

export const useBrregApi = () => {
  const searchResults = ref<brreg[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const searchCompanies = async (query: string) => {
    if (query.length < 3) return;

    isLoading.value = true;
    error.value = null;

    try {
      // Search for companies in Brønnøysundregisteret based on name
      const response = await fetch(
        `https://data.brreg.no/enhetsregisteret/api/enheter?navn=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();

      searchResults.value =
        data._embedded?.enheter?.map((item: any) => ({
          organizationNumber: item.organisasjonsnummer,
          name: item.navn,
        })) || [];
    } catch (e) {
      error.value = "Feil under henting av data fra Brønnøysundregisteret";
      searchResults.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    searchResults,
    isLoading,
    error,
    searchCompanies,
  };
};
