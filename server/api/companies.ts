import type { BrregFirma } from "~/types/brreg";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const searchTerm = query.name as string;

  if (!searchTerm || searchTerm.length < 3) {
    return [];
  }

  try {
    const response = await fetch(
      `https://data.brreg.no/enhetsregisteret/api/enheter?navn=${encodeURIComponent(
        searchTerm
      )}`
    );
    const data = await response.json();

    return (
      data._embedded?.enheter?.map((item: BrregFirma) => ({
        organizationNumber: item.organisasjonsnummer,
        name: item.navn,
      })) ?? []
    );
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Det oppstod en feil ved henting av kunder",
    });
  }
});
