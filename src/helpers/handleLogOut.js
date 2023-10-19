const handleLogOut = (navigate) => {
  localStorage.clear();
  navigate("/login");
}
export default handleLogOut;
