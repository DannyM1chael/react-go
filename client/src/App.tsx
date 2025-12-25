import { Container, Stack } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

function App() {
    return (
        <Stack
            minH="100vh"
            bg={{ base: "gray.50", _dark: "gray.950" }}
        >
            <Navbar>
                <Container maxW="900px">
                    <TodoForm />
                    <TodoList />
                </Container>
            </Navbar>
        </Stack>
    )
}

export default App