import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import TodoItem from "@/components/TodoItem";

const TodoList = () => {
	const [isLoading, setIsLoading] = useState(false);
	const todos = [
		{
			_id: 1,
			body: "Buy groceries",
			completed: true,
		},
		{
			_id: 2,
			body: "Walk the dog",
			completed: false,
		},
		{
			_id: 3,
			body: "Do laundry",
			completed: false,
		},
		{
			_id: 4,
			body: "Cook dinner",
			completed: true,
		},
	];
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