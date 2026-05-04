import type { Response } from "express"
/**
Used for standard response
*/
export const _res = {
  error: (
    code: number,
    res: Response,
    message: string) => res.status(code).json({
    success: false,
    message
  }),
  success: (
    code: number,
    res: Response,
    message: String,
    data?: any
  ) => res.status(code).json({
      success: true,
      message,
      data
  })
}
