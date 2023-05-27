export type CustomPlaylistType = {
    email : string,
    playlists  : Array<SinglePlaylistModel>
}
type SinglePlaylistModel = {
    id : string,
    name : string,
    songs : Array<string>
}
