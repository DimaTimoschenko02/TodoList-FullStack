import mongoose , { Document, Model, model, Schema } from "mongoose";
import { ITodo } from "todos.type";


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
    type: String,
    default: 2022
  },
   
  public: {
    type: Boolean,
    default: true
  },
  completed:{
    type: Boolean,
    default:false
  },
  userId: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	}
},
{
  timestamps:true
});

const Todo: Model<ITodo> = model("Todo", todoSchema);

export default Todo;
