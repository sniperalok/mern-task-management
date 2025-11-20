import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getTasks, deleteTask } from '../services/api';
import { Box, VStack, Text, IconButton, useToast, Spinner, HStack } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const TaskList = ({ onEdit }) => {
  const { data: tasks = [], isLoading } = useQuery('tasks', getTasks, {
    refetchInterval: 5000,
  });
  const queryClient = useQueryClient();
  const toast = useToast();

  const deleteMutation = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
      toast({
        title: 'Task deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Error deleting task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  if (isLoading) return <Spinner />;

  if (tasks.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="lg" color="gray.500">
          No tasks yet. Create one to get started!
        </Text>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      {tasks.map((task) => (
        <Box
          key={task._id}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bg="white"
          shadow="sm"
          _hover={{ shadow: 'md' }}
        >
          <Box flex={1}>
            <Text fontWeight="bold" fontSize="lg">
              {task.title}
            </Text>
            {task.description && (
              <Text color="gray.600" mt={1}>
                {task.description}
              </Text>
            )}
            <HStack mt={2}>
              <Text
                color={task.status === 'completed' ? 'green.500' : task.status === 'in-progress' ? 'blue.500' : 'orange.500'}
                fontSize="sm"
                fontWeight="semibold"
                textTransform="capitalize"
              >
                {task.status}
              </Text>
            </HStack>
          </Box>
          <HStack spacing={2}>
            <IconButton
              icon={<EditIcon />}
              onClick={() => onEdit(task)}
              colorScheme="blue"
              variant="ghost"
              aria-label="Edit task"
            />
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => deleteMutation.mutate(task._id)}
              colorScheme="red"
              variant="ghost"
              aria-label="Delete task"
              isLoading={deleteMutation.isLoading}
            />
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};

export default TaskList;
