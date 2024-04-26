<script setup lang="ts">

const { setFlag } = useFlagStore();
const task = ref('');

async function handleClick() {
	// POST : /api/v1/todo_list
	const runtimeConfig = useRuntimeConfig()
	const { data, pending, error, refresh } = await useAsyncData(
		'postTodoListItem',
		() => $fetch(
				runtimeConfig.public.baseURL + '/api/v1/todo_list',
			{
				method: 'POST',
				body: {
					"todo_list_item": {
						"content": task.value,
						"state": "outstanding"
					}
				}
			}
		)
	)
	console.dir(data);
	console.dir(error);
	task.value = '';
	setFlag(true);
};
</script>

<template>
	<div>
		<form>
			<div class="input-group">
				<input class="form-control" type="text" placeholder="write your something to do" v-model="task">
				<span class="input-group-button">
					<button class="btn" type="button" aria-label="Copy to clipboard" @click="handleClick">
						confirm
					</button>
				</span>
			</div>
		</form>
	</div>
</template>
