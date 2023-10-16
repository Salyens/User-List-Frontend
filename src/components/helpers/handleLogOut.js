function handleLogOut(e, navigate) {
  localStorage.clear();
  navigate("/login");
}
export default handleLogOut;
