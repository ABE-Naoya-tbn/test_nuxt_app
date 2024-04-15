export type Todo = {
  id?: number,
  content: string
  state: string
}

export const State = {
  outstanding: '未処理',
  processing: '処理中',
  processed: '処理済み',
  completed: '完了'
}
