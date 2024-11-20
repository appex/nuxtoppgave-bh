export const useBrregApi = () => {
  const searchQuery = ref("");
  const {
    data: searchResults,
    status,
    error,
  } = useFetch("/api/companies", {
    query: computed(() => ({
      name: searchQuery.value,
    })),
    watch: [searchQuery],
  });

  return {
    searchQuery,
    searchResults,
    isLoading: computed(() => status.value === "pending"),
    error,
  };
};
