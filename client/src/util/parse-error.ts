export const parseError = async (response: Response) => {
  let errors = []
  const contentType = response.headers.get('Content-Type')
  if (contentType && contentType.startsWith('application/json')) {
    const error = await response.json()
    errors = error.errors
  }
  return {
    status: response.status,
    errors
  }
}
