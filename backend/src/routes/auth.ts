import { Router, Request, Response } from "express";
import { supabase } from "../config/supabase";
import { _res } from "../utils/helper";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { full_name, email, phone_number, password } = req.body; 

    if (!full_name || !email || !phone_number|| !password) {
      return _res.error(400, res, 'Full name, email, phone number and password are required')
    }

    let { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    console.log(error)
    console.log(data)

    if (error) {
      return _res.error(400, res, error.message)
    }

    error = (await supabase.auth.updateUser({
      phone: phone_number
    })).error;

    if (error) {
      return _res.error(400, res, error.message)
    }

    error = (await supabase.from('profiles').insert({
      full_name,
      avatar_url: ""
    })).error
    
    if (error) {
      return _res.error(400, res, error.message)
    }

    return _res.success(
      201,
      res,
      'User registered successfully',
      {
        user: {
          id: data.user?.id,
          email: data.user?.email
        },
        token: data.session?.access_token || null
      }
    )
  } catch (err) {
    console.log(err)
    _res.error(500, res, 'Server error during registration')
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body; 

    if (!email || !password) return _res.error(400, res, 'Email and password are required')
    
    const {data, error } = await supabase.auth.signInWithPassword({
      email,
      password, 
    });

    if (error) {
    return _res.error(401, res, error.message)
    }

    return _res.success(
      201,
      res,
      "User logged in successfully",
      {
        token: data.session.access_token
      })
  } catch (err){
    console.log(err)
    return _res.error(500, res, 'Server error')
  }
});

export default router;

