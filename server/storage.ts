import { type User, type InsertUser, type WaitlistEntry, type InsertWaitlistEntry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
  getWaitlistCount(): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private waitlistEntries: Map<number, WaitlistEntry>;
  private waitlistIdCounter: number;

  constructor() {
    this.users = new Map();
    this.waitlistEntries = new Map();
    this.waitlistIdCounter = 1;
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createWaitlistEntry(insertEntry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    const existing = await this.getWaitlistEntryByEmail(insertEntry.email);
    if (existing) {
      throw new Error('Email already registered');
    }

    const id = this.waitlistIdCounter++;
    const entry: WaitlistEntry = {
      ...insertEntry,
      id,
      createdAt: new Date(),
    };
    this.waitlistEntries.set(id, entry);
    return entry;
  }

  async getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined> {
    return Array.from(this.waitlistEntries.values()).find(
      (entry) => entry.email.toLowerCase() === email.toLowerCase(),
    );
  }

  async getWaitlistCount(): Promise<number> {
    return this.waitlistEntries.size;
  }
}

export const storage = new MemStorage();
