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
        required : true,
        defaultValue : '#'+'personal_playlist'+Math.random()*1000
    }
    ,
    songIds : {
        type : [String],
        default : []
    }
})

const PlaylistModel = models.PlaylistModel || model('PlaylistModel',playListSchema,'playlists');

export default PlaylistModel;