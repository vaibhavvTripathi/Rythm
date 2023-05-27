export type CustomPlaylistType = {
    email : string,
    playlists  : Array<SinglePlaylistModel>
}
export type SinglePlaylistModel = {
    id : string,
    name : string,
    songs : Array<string>
}
