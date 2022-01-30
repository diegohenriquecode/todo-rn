import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const updateTasks = tasks.map((task) => ({ ...task }));
    const hasSameTask = updateTasks.find((task) => task.title === newTaskTitle);

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    if (hasSameTask)
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      );

    setTasks((oldTasks) => [...oldTasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map((task) => ({ ...task }));
    const findTask = updateTasks.find((task) => task.id === id);

    if (!findTask) return;

    findTask.done = !findTask.done;
    setTasks(updateTasks);
  }

  function handleRemoveTask(id: number) {
    return Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          onPress: () => null,
        },
        {
          text: 'Sim',
          onPress: () =>
            setTasks((oldState) => oldState.filter((task) => task.id !== id)),
        },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updateTasks = tasks.map((task) => ({ ...task }));
    const findTask = updateTasks.find((task) => task.id === taskId);

    if (!findTask) return;

    findTask.title = taskNewTitle;
    setTasks(updateTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
