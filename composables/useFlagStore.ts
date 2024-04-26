import type { Ref } from "nuxt/dist/app/compat/capi";

export const useFlagStore = () => {
	const flag = useState("flag", () => (false))
	return {
		flag: readonly(flag),
		setFlag: setFlag(flag),
		deleteTodo: deleteTodo(flag)
	};
};

const setFlag = (flag: Ref<boolean>) => (val: boolean) => { flag.value = val };

const deleteTodo = (flag: Ref<boolean>) => (id: string) => {
	const runtimeConfig = useRuntimeConfig()
	const pending = useFetch(
		runtimeConfig.public.baseURL + '/api/v1/todo_list/' + id, { method: "delete", }
	)
	flag.value = true
};
