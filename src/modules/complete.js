const clearCompleted = document.querySelector('.clear-completed');
clearCompleted.addEventListener('click', () => {
  const storage = JSON.parse(localStorage.getItem('tasks'));
  const notCompleted = storage.filter((item) => item.completed === false);
  localStorage.setItem('tasks', JSON.stringify(notCompleted));
  window.location.reload();
});

export default clearCompleted;