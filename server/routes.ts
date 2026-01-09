import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/waitlist", async (req, res) => {
    try {
      const result = insertWaitlistEntrySchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          error: validationError.message 
        });
      }

      const entry = await storage.createWaitlistEntry(result.data);
      const count = await storage.getWaitlistCount();
      
      res.status(201).json({ 
        success: true,
        position: count 
      });
    } catch (error: any) {
      if (error.message === 'Email already registered') {
        return res.status(409).json({ 
          error: 'This email is already on the waitlist' 
        });
      }
      
      console.error('Waitlist error:', error);
      res.status(500).json({ 
        error: 'Failed to join waitlist. Please try again.' 
      });
    }
  });

  app.get("/api/waitlist/count", async (req, res) => {
    try {
      const count = await storage.getWaitlistCount();
      res.json({ count });
    } catch (error) {
      console.error('Waitlist count error:', error);
      res.status(500).json({ error: 'Failed to get waitlist count' });
    }
  });

  return httpServer;
}
