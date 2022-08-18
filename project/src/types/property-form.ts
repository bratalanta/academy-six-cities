export type FormState = {
  comment: string;
  rating: string;
}

export type PostReviewPayload = {
  propertyId?: number;
} & FormState
