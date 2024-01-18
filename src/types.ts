export type TDiff = {

}

export type TDoc =  {
    id: number
    data: string
    createdAt: Date
}

export type TDocCreate = Omit<TDoc, "id" | "createdAt">
export type TDocUpdate = Omit<TDoc, "createdAt">
export enum EChannelName {
    doc_insert_channel = "doc_insert_channel",
    doc_update_channel = "doc_update_channel",
    doc_delete_channel = "doc_delete_channel",
    doc_truncate_channel = "doc_truncate_channel",
}