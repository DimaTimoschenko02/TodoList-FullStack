import { Document, Model, model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
export interface ITodo extends Document {
  title: string;
  body: string;
  year: Date;
  public: boolean;
  completed: boolean;
}

const todoSchema: Schema = new Schema({
  title: String,
  // todoId: {
	// 	type: String,
	// 	required: true,
	// 	unique: true,
	// 	default: () => uuidv4(),
	// },
  body: {
    type: String,
    required: true,
  },

  year: {
    type: Date,
    default: Date.now
  },
  public: {
    type: Boolean,
    default: true
  },
  completed:{
    type: Boolean,
    default:false
  } 
},
{
  timestamps:true
});

const Todo: Model<ITodo> = model("Todo", todoSchema);

export default Todo;
