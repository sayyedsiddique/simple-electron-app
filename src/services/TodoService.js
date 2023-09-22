const { default: axios } = require('axios');

const handleTodoFormSubmit = async (opt) => {
  console.log("opt... ", opt)
  // const resp = await axios.post('http://127.0.0.1:8000/api/task', opt);
  // return resp.data.task;
};

module.exports = { handleTodoFormSubmit };
