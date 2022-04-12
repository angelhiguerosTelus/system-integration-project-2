const { createElement, setNewUsername } = require("../public/js/messages");

// libs

const sum = (a, b) => {
  return a + b;
};

describe("Message operations", () => {
  test("Message HTMl created", () => {
    let el = createElement(
      "user",
      "hello word",
      "justify-content-start",
      "11-04-2020"
    );

    let tempHTML = document.createElement("div");
    tempHTML.innerHTML = `
              <div>
              <p class="small ms-3 mb-3 rounded-3 text-muted">user</p>
              <p
                  class="small p-2 ms-3 mb-1 rounded-3"
                  style="background-color: #f5f6f7"
              >
                  hello word
              </p>
              <p class="small ms-3 mb-3 rounded-3 text-muted">11-04-2020</p>
              </div>`;

    expect(el.innerHTML).toBe(tempHTML.innerHTML);
  });

  test("Username updated", () => {

    let user = 'User 1'
    let usernameH5 = document.createElement("div");
    let userData = setNewUsername(user, usernameH5, 'Username');

    expect(userData).toEqual({ username: 'Username', usernameH5: 'Username' });
  });
});
