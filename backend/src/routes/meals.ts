import { Router, Request, Response } from "express";

const router = Router();

// TODO: preference
router.post("/preference", (req: Request, res: Response) => {
  res.status(200).json({
    success: true, 
    message: "preference retrieved successfully", 
    data: {
    
    }
  });
});

// TODO: get meals
router.get("/meals", (req: Request, res: Response) => {
  res.status(200).json({
    success: true, 
    message: "meals retrieved successfully", 
    data: {
    
    }
  });
});

// TODO: add meals plan
router.post("/meals-plan/generate", (req: Request, res: Response) => {
    res.status(201).json({
        success: true, 
        message: "meals plan generated successfully", 
        data: {
        
        }
    });
})

// TODO: get meals plan
router.get("/meals-plan/:id", (req: Request, res: Response) => {
    res.status(200).json({
        success: true, 
        message: "meals plan generated successfully", 
        data: {
        
        }
    });
})

// TODO:get ingredients
router.get("/ingredients/:planId", (req: Request, res: Response) => {
  res.status(200).json({
    success: true, 
    message: "ingredients retrieved successfully", 
    data: {
    
    }
  });
});

export default router;

