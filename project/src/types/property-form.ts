export type FormState = {
  comment: string;
  rating: string;
}

export type CreateReviewPayload = {
  propertyId?: number;
} & FormState
