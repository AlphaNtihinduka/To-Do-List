
const clearCompleted = () => {
    const storage = JSON.parse(localStorage.getItem('tasks'));
  const notCompleted = storage.filter((item) => item.completed === false);
  for (let i = 0; i < notCompleted.length; i += 1) {
    notCompleted[i].index = i + 1;
  }
  localStorage.setItem('tasks', JSON.stringify(notCompleted));

  window.location.reload();
}

const clearListener = () => {
  document.querySelector('.clear-completed').addEventListener('click',clearCompleted)
}
clearListener()


export default clearListener;