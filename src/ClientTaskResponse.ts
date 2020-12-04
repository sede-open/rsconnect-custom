export interface ClientTaskResponse {
    id: string
    userId: number
    status: string[]
    result?: ClientTaskResult
    finished: boolean
    code: number
    error: string
    lastStatus: number
}

export interface ClientTaskResult {
    type: string
    data: any
}
