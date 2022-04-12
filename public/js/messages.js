// HTML --------------------------
const createElement = (user, msg, className, date) => {
  let newMsg = document.createElement("div");
  newMsg.classList.add("d-flex");
  newMsg.classList.add("flex-row");
  newMsg.classList.add(className);

  newMsg.innerHTML = `
              <div>
              <p class="small ms-3 mb-3 rounded-3 text-muted">${user}</p>
              <p
                  class="small p-2 ms-3 mb-1 rounded-3"
                  style="background-color: #f5f6f7"
              >
                  ${msg}
              </p>
              <p class="small ms-3 mb-3 rounded-3 text-muted">${date}</p>
              </div>`;

  return newMsg;
};

const setNewUsername = (username, usernameH5, value) => {
  username = value;
  usernameH5.innerHTML = value;
  return {
    username,
    usernameH5: value,
  };
};

const getUserData = () => {
  return {
    username,
  };
};

module.exports = {
  createElement,
  setNewUsername,
  getUserData,
};
