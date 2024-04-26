<script>
import TodoListTables from '~/components/TodoListTables.vue';
import TodoListForms from '~/components/TodoListForms.vue';
</script>
<template>
  <div class="d-flex flex-justify-center flex-items-center">
    <div class="container mt-3">
      <div class="columns mb-1">
        <TodoListForms />
      </div>
      <br>
      <div class="columns mb-1">
        <TodoListTables />
      </div>
    </div>
  </div>
</template>

<style>
p {
    text-align: center;
}
</style>
