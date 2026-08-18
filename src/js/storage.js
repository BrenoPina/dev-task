export const saveTasks = tasks => {
  return localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const loadTasks = () => {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  return tasks;
};
