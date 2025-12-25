import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TodoItem = ({ todo }: { todo: any }) => {
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
				>
					<FaCheckCircle size={20} />
				</Box>
				<Box
					color={{ base: "red.600", _dark: "red.400" }}
					cursor={"pointer"}
					_hover={{ color: { base: "red.700", _dark: "red.300" } }}
				>
					<MdDelete size={25} />
				</Box>
			</Flex>
		</Flex>
	);
};
export default TodoItem;