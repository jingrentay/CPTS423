import mongoose from "mongoose";

const counterSchema = mongoose.Schema({
    id:{
        type:String
    },
    seq:{
        type:Number
    }
})

const Counter = mongoose.model('Counter', counterSchema);

export default Counter;