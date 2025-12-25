import {Badge, Box, Flex, Spinner, Text} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import type { Todo } from "@/components/TodoList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_API_URL } from "@/App";

const TodoItem = ({ todo }: { todo: Todo }) => {
	const queryClient = useQueryClient()

	const { mutate: updateTodo, isPending: isUpdatePending } = useMutation({
		mutationKey: ["updateTodo"],
		mutationFn: async () => {
			if(todo.completed) return alert("Todo is already completed")

			try {
				const res = await fetch(`${BASE_API_URL}/todos/${todo._id}`, {
					method: "PATCH",
				})
				const data = await res.json()

				if(!res.ok) {
					throw new Error(data.error || "Something went wrong")
				}

				return data
			} catch (e) {
				console.log(e)
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ["todos"]})
		}
	})

	const { mutate: deleteTodo, isPending: isDeletePending } = useMutation({
		mutationKey: ["deleteTodo"],
		mutationFn: async () => {
			try {
				const res = await fetch(`${BASE_API_URL}/todos/${todo._id}`, {
					method: "DELETE",
				})
				const data = await res.json()

				if(!res.ok) {
					throw new Error(data.error || "Something went wrong")
				}

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
		<Flex gap={2} alignItems={"center"}>
			<Flex
				flex={1}
				alignItems={"center"}
				border={"1px"}
				borderColor={{ base: "gray.300", _dark: "gray.600" }}
				bg={{ base: "white", _dark: "gray.800" }}
				p={2}
				borderRadius={"lg"}
				justifyContent={"space-between"}
			>
				<Text
					color={todo.completed
						? { base: "green.600", _dark: "green.300" }
						: { base: "gray.800", _dark: "gray.100" }
					}
					textDecoration={todo.completed ? "line-through" : "none"}
				>
					{todo.body}
				</Text>
				{todo.completed && (
					<Badge ml='1' colorPalette='green'>
						Done
					</Badge>
				)}
				{!todo.completed && (
					<Badge ml='1' colorPalette='yellow'>
						In Progress
					</Badge>
				)}
			</Flex>
			<Flex gap={2} alignItems={"center"}>
				<Box
					color={{ base: "green.600", _dark: "green.400" }}
					cursor={"pointer"}
					_hover={{ color: { base: "green.700", _dark: "green.300" } }}
					onClick={() => updateTodo()}
				>
					{!isUpdatePending && <FaCheckCircle size={20} />}
					{isUpdatePending && <Spinner size={"sm"} />}
				</Box>
				<Box
					color={{ base: "red.600", _dark: "red.400" }}
					cursor={"pointer"}
					_hover={{ color: { base: "red.700", _dark: "red.300" } }}
					onClick={() => deleteTodo()}
				>
					{!isDeletePending && <MdDelete size={25}/>}
					{isDeletePending && <Spinner size={"sm"} />}
				</Box>
			</Flex>
		</Flex>
	);
};
export default TodoItem;