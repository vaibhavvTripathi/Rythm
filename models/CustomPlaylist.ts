import { Schema,model,models } from "mongoose";

const customPlaylist = new Schema({
    email : {
        type : String,
        required : true,
        unique : true,
    },
    playlists : [{
        type : 
            {id : {
             type : String,
             unique : true,
             required : true
            },
            name : String
            ,
             songs : [String]
            }
        
    }]
})

const CustomPlaylistModel = models.CustomPlaylistModel || model('CustomPlaylistModel',customPlaylist,'customPlaylists');
export default CustomPlaylistModel;