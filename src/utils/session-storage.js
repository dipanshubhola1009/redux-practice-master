export const saveUserDataInMemory = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
    localStorage.setItem("isAuthenticated" , true)
}

export const deleteUserDataFromMemory = () => {
    localStorage.clear();
}

