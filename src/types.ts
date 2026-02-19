export interface Event {
  message: string
  supply?: number,
  ammunition?: number,
  resources?: number,
  units?: number
  rep?: boolean
}