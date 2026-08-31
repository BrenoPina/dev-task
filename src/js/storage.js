const STORAGE_KEY = 'tasks';

export const saveTasks = tasks => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Falha ao salvar tarefas no localStorage:', error);
  }
};

export const loadTasks = () => {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error('Dados corrompidos no localStorage. Resetando estado:', error);
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};
