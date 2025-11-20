import { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { createTask, updateTask } from '../services/api';

const TaskForm = ({ isOpen, onClose, task }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
  });
  const toast = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'pending',
      });
    }
  }, [task, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation(
    task ? (data) => updateTask(task._id, data) : createTask,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
        toast({
          title: task ? 'Task updated successfully' : 'Task created successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onClose();
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description: error.response?.data?.message || 'Something went wrong',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({
        title: 'Error',
        description: 'Title is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{task ? 'Edit Task' : 'Add New Task'}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                  autoFocus
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter task description"
                  rows={4}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={mutation.isLoading}
              loadingText="Saving..."
            >
              {task ? 'Update' : 'Create'} Task
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default TaskForm;
