import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import TodoItem from "@/components/TodoItem";
import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "@/App";

export type Todo = {
	_id: number;
	body: string;
	completed: boolean;
}

const TodoList = () => {
	const {data: todos, isLoading} = useQuery<Todo[], Error>({
		queryKey: ["todos"],
		queryFn: async () => {
			try {
				const res = await fetch(`${BASE_API_URL}/todos`)
				const data = await res.json()

				if(!res.ok) {
					throw new Error(data.error || "Something went wrong")
				}

				return data || []
			} catch (e) {
				console.log(e)
			}
		}
	})
	return (
		<>
			<Text
				fontSize={"4xl"}
				textTransform={"uppercase"}
				fontWeight={"bold"}
				textAlign={"center"}
				my={2}
				bgGradient="to-r"
				gradientFrom={{ base: "blue.600", _dark: "blue.400" }}
				gradientTo={{ base: "purple.600", _dark: "purple.400" }}
				bgClip="text"
			>
				Today's Tasks
			</Text>
			{isLoading && (
				<Flex justifyContent={"center"} my={4}>
					<Spinner size={"xl"} />
				</Flex>
			)}
			{!isLoading && todos?.length === 0 && (
				<Stack alignItems={"center"} gap='3'>
					<Text
						fontSize={"xl"}
						textAlign={"center"}
						color={{ base: "gray.600", _dark: "gray.400" }}
					>
						All tasks completed! 🤞
					</Text>
				</Stack>
			)}
			<Stack gap={3}>
				{todos?.map((todo) => (
					<TodoItem key={todo._id} todo={todo} />
				))}
			</Stack>
		</>
	);
};
export default TodoList;