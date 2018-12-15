const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create UserGroup Schema
const GroupSchema = new Schema({
  groupname: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      authorizationLevel: {
        type: Number,
        default: Number(0)
      },
      token: String
    }
  ]
});

module.exports = Group = mongoose.model("groups", GroupSchema);
