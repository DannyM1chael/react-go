import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {BASE_API_URL} from "@/App.tsx";

const TodoForm = () => {
	const [newTodo, setNewTodo] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const queryClient = useQueryClient()

	const { mutate: createTodo, isPending } = useMutation({
		mutationKey: ["createTodo"],
		mutationFn: async (e: FormEvent) => {
			e.preventDefault();
			try {
				const res = await fetch(`${BASE_API_URL}/todos`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ body: newTodo })
				})
				const data = await res.json()

				if(!res.ok) {
					throw new Error(data.error || "Something went wrong")
				}

				setNewTodo("")

				return data
			} catch (e) {
				console.log(e)
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ["todos"]})
		}
	})

	return (
		<form onSubmit={createTodo}>
			<Flex gap={2} mb={4}>
				<Input
					type='text'
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					ref={inputRef}
					placeholder='Add a new task...'
					bg={{ base: "white", _dark: "gray.800" }}
					borderColor={{ base: "gray.300", _dark: "gray.600" }}
					_placeholder={{ color: { base: "gray.400", _dark: "gray.500" } }}
					_hover={{ borderColor: { base: "gray.400", _dark: "gray.500" } }}
					_focus={{ borderColor: { base: "blue.500", _dark: "blue.400" }, boxShadow: "outline" }}
				/>
				<Button
					type='submit'
					colorPalette='blue'
					px={8}
					_active={{
						transform: "scale(.97)",
					}}
				>
					{isPending ? <Spinner size={"xs"} /> : <IoMdAdd size={30} />}
				</Button>
			</Flex>
		</form>
	);
};
export default TodoForm;