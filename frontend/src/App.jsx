import { ChakraProvider, Box, Container, Button, useDisclosure, VStack, Heading } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { useState } from 'react';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = () => {
    setEditingTask(null);
    onOpen();
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    onOpen();
  };

  const handleCloseForm = () => {
    setEditingTask(null);
    onClose();
  };

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50" py={8}>
        <Container maxW="container.md">
          <VStack spacing={8} align="stretch">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Heading as="h1" size="2xl" color="blue.600">
                📝 Task Manager
              </Heading>
              <Button
                leftIcon={<AddIcon />}
                colorScheme="blue"
                size="lg"
                onClick={handleAddTask}
              >
                Add Task
              </Button>
            </Box>

            <TaskList onEdit={handleEditTask} />

            <TaskForm
              isOpen={isOpen}
              onClose={handleCloseForm}
              task={editingTask}
            />
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
