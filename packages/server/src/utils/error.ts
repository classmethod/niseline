export const errorToJson = (error: Error) => ({
  name: error.name,
  message: error.message,
  stack: error.stack,
})
