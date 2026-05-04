import { Router, Request, Response } from "express";
import { supabase } from "../config/supabase";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { full_name, email, phone_number, password } = req.body; 

    if (!full_name || !email || !phone_number|| !password) {
      return res.status(400).json({
        error: 'Full name, email, phone number and password are required'
      });
    }

    let { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    console.log(error)
    console.log(data)

    if (error) {
      return res.status(400).json({
        error: error.message
      });
    }

    error = (await supabase.auth.updateUser({
      phone: phone_number
    })).error;

    if (error) {
      return res.status(400).json({
        error: error.message
      })
    }

    error = (await supabase.from('profiles').insert({
      full_name,
      avatar_url: ""
    })).error

    
    if (error) {
      return res.status(400).json({
        error: error.message
      })
    }
    res.status(201).json({
      success: true, 
      message: 'User registered successfully',
      data: {
        user: {
          id: data.user?.id,
          email: data.user?.email
        },
        token: data.session?.access_token || null
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: 'Server error during registration'
    });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body; 

    if (!email || !password) return res.status(400).json({error: 'Email and password are required'})
    
    const {data, error } = await supabase.auth.signInWithPassword({
      email,
      password, 
    });

    if (error) {
      return res.status(401).json({
        error: error.message
      })
    }

    res.status(200).json({
      success: true, 
      message: "User logged in successfully", 
      data: {
        token: data.session.access_token
      }
    });
  } catch (err){
    res.status(500).json({ error: 'Server error'})
  }
});

export default router;

