<template>
  <section class="container">
    <h1 class=".title">Todoリスト</h1>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="10">
          <v-text-field
            v-model="content"
            placeholder="タスクを入力してください"
            outlined
          />
        </v-col>
        <v-col cols="12" md="2">
          <v-btn elevation="2" @click="add"> 追加 </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-btn elevation="2">全て</v-btn>
    <v-btn elevation="2">未処理</v-btn>
    <v-btn elevation="2">処理中</v-btn>
    <v-btn elevation="2">処理済み</v-btn>
    <v-btn elevation="2">完了</v-btn>

    <v-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">タスク</th>
            <th class="text-left">状態</th>
            <th class="text-left">削除</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in todo_list_items" :key="index">
            <td>{{ item.content }}</td>
            <td>
              <v-btn elevation="2" @click="update(item)">{{
                item.state
              }}</v-btn>
            </td>
            <td><v-btn elevation="2" @click="remove(item)">削除</v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-table>
  </section>
</template>

<script lang='ts'>
// import { Todo, State } from '../../types/todo'
type Todo = {
  id?: number,
  content: string
  state: string
}

const State = {
  outstanding: '未処理',
  processing: '処理中',
  processed: '処理済み',
  completed: '完了'
}

interface DataType {
  todo_list_items: Todo[]
  content: string
}

// const res = await fetch(`${baseURL}/api/v1/todo_list`)
// const todo_list_items = res.json();

export default {
  data(): DataType {
    return {
      todo_list_items: [],
      content: '',
    }
  },
  methods: {
    fetch_list() {
      useFetch(`http://localhost:3000/api/v1/todo_list`)
      .then((res: any) => {
        const json = res.data
        console.dir(json)
        this.todo_list_items = json as Todo[]
      })
    },
    add() {
      const todo: Todo = {
        content: this.content,
        state: State.outstanding,
      }
      useFetch(`http://localhost:3000/api/v1/todo_list`, {
        method: 'POST',
        body: {
          todo: todo
        },
      })
      .then((res: any) => {
        console.dir('[debug] add: ' + res)
        this.fetch_list()
      })
      .catch((err: any) => {
        console.dir(err)
      })
    },
    update(todo: Todo) {
      switch (todo.state) {
        case State.outstanding:
          todo.state = State.processing
          break
        case State.processing:
          todo.state = State.processed
          break
        case State.processed:
          todo.state = State.completed
          break
        case State.completed:
          todo.state = State.outstanding
          break
        default:
          console.dir('State error')
          return
      }
      useFetch(`http://localhost:3000/api/v1/todo_list/${todo.id}`, {
        method: 'PUT',
        body: {
          todo: todo
        },
      })
      .then((res: any) => {
        console.dir('[debug] update: ' + res)
        this.fetch_list()
      })
      .catch((err: any) => {
        console.dir(err)
      })
    },
    remove(todo: Todo) {
      useFetch(`http://localhost:3000/api/v1/todo_list/${todo.id}`, {
          method: 'DELETE',
          body: {
            todo: todo
          },
        } as Object)
        .then((res: any) => {
          console.dir(res)
          this.fetch_list()
        })
        .catch((err: any) => {
          console.dir(err)
        })
    },
  },
  mounted: function () {
    this.fetch_list()
  },
}
</script>