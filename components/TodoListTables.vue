<script setup lang="ts">
// GET : /api/v1/todo_list
const runtimeConfig = useRuntimeConfig()
const { data, pending, error, refresh } = await useAsyncData(
	'getTodoListItems',
	() => $fetch(
		runtimeConfig.public.baseURL + '/api/v1/todo_list'
	)
);
console.dir(data);

const { flag, setFlag, deleteTodo } = useFlagStore();
watch(flag, () => {
	if (flag) {
		const startMsec = new Date();
		while (Number(new Date()) - Number(startMsec) < 100);
		refresh();
		setFlag(false);
	}
})
</script>

<template>
	<div>
		<p v-if="error">{{ error }}</p>
		<table border="1" width="500">
			<tbody>
				<tr v-for="todo in data" :key="todo.id">
					<td class="content">{{ todo.content }}</td>
					<td class="button">
						<button class="btn-mktg btn-signup-mktg full-button" type="button"
							@click="deleteTodo(todo.id)">Delete</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style>
.full-button {
    width: 100%;
    height: 100%;
}

.content {
    width: 80%;
}

.button {
    width: 20%;
}
</style>