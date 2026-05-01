import { Router, Request, Response } from "express";
import { supabase } from "../config/supabase";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body; 

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      return res.status(400).json({
        error: error.message
      });
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
      message: "preference retrieved successfully", 
      data: {
        token: data.session.access_token
      }
    });
  } catch (err){
    res.status(500).json({ error: 'Server error'})
  }
});

export default router;

