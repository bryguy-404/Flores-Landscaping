export interface LiveReview {
  name: string;
  text: string;
  sourceUrl: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string | null;
  authorUrl: string | null;
  avatarUrl: string | null;
  languageCode: string | null;
}

export interface GoogleReviewsResponse {
  reviews: LiveReview[];
  attributions: { name: string; uri: string | null }[];
}

// Public link only. The Place ID and API key used for requests are server bindings.
export const googleReviewsUrl = 'https://www.google.com/maps/search/?api=1&query=Flores%20Landscaping%20LLC%2057131%20Ponderosa%20Ct%20South%20Bend%20IN';
