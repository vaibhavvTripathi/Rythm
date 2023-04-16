import { Schema,model,models } from "mongoose";

const playListSchema = new Schema({
    playListId : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    playListName : {
        type : String,
        default : `myPlaylist ${Math.floor(Math.random() *10000)}`
    }
    ,
    songIds : {
        type : [String],
        default : []
    }
})

const PlaylistModel = models.PlaylistModel || model('PlaylistModel',playListSchema,'playlists');
playListSchema.index({ email: 1 }, { unique: true, sparse: true });

export default PlaylistModel;