import type { Request, Response, NextFunction } from "express"
import { _res } from "../utils/helper";
import { supabase } from "../config/supabase";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization; 

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return _res.error(401, res, "Missing or invalid authorization header")
    }

    const token = authHeader.replace("Bearer ", '')
    const {data, error} = await supabase.auth.getUser(token); 

    if (error || !data.user) {
      return _res.error(401, res, "Invalid or expired token")
    }

    req.user = data.user; 

    next()
  } catch (err) {
      return _res.error(401, res, "Authentication failed")
  }
}
