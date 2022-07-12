import mongoose from "mongoose";

export interface ITodo extends mongoose.Document{
    title: string;
    body: string;
    year: string;
    public: boolean;
    completed: boolean;
    userId:string
  }