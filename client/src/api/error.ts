export type ApiError = {
  status: number
  errors: Array<{ [index: string]: string }>
}
