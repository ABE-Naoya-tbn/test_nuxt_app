<script setup lang="ts">

const { setFlag } = useFlagStore();
const task = ref('');

async function handleClick() {
    const runtimeConfig = useRuntimeConfig()
    const res = await $fetch(runtimeConfig.public.baseURL + '/api/v1/todo_list', {
        method: 'POST',
        body: {
          "todo_list_item": {
            "content": task.value,
            "state": "outstanding"
          }
        },
        headers: {
          "Access-Control-Allow-Origin": "no-cors"
        }
    });
    console.dir(res);
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
