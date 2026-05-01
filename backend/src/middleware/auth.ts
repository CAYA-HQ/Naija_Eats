import type { Request, Response, NextFunction } from "express"
import { supabase } from "../config/supabase";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization; 

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Missing or invalid authorization header"
      })
    }

    const token = authHeader.replace("Bearer ", '')
    const {data, error} = await supabase.auth.getUser(token); 

    if (error || !data.user) {
      return res.status(401).json({
        success: false, 
        message: "Invalid or expired token"
      })
    }

    req.user = data.user; 

    next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed"
    })
  }
}
