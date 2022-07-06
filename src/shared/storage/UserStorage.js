export function removeCurrentUser() {
  return localStorage.removeItem("currentUser");
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

export function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function getRegisteredUsers() {
  return JSON.parse(localStorage.getItem("registeredUsers"));
}

export function setRegisteredUsers(registeredUsers) {
  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
}


