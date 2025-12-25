import { Box, Flex, Button, Text, Container } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useColorMode } from "@/components/ui/color-mode";
import type { ReactNode } from "react";

export default function Navbar({ children }: { children?: ReactNode }) {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <Container maxW={"900px"}>
                <Box
                    bg={{ base: "gray.200", _dark: "gray.800" }}
                    px={4}
                    my={4}
                    borderRadius={"md"}
                    boxShadow={{ base: "sm", _dark: "dark-lg" }}
                >
                    <Flex h={16} alignItems="center" justifyContent="space-between">
                        <Flex
                            justifyContent="center"
                            alignItems="center"
                            gap={3}
                            display={{ base: "none", sm: "flex" }}
                        >
                            <Text fontSize="40" fontWeight="bold">React</Text>
                            <Text fontSize="40">+</Text>
                            <Text fontSize="40" fontWeight="bold">Golang</Text>
                        </Flex>

                        <Flex alignItems="center" gap={3}>
                            <Text fontSize="lg" fontWeight={500}>
                                Daily Tasks
                            </Text>
                            <Button
                                onClick={toggleColorMode}
                                variant="ghost"
                                size="sm"
                            >
                                {colorMode === "light" ? <IoMoon size={20} /> : <LuSun size={20} />}
                            </Button>
                        </Flex>
                    </Flex>
                </Box>
            </Container>
            {children}
        </>
    );
}