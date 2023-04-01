import instance from "../api/configurations";

 const setAuthToken = (token:string) => {
	if (token) {
		instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	}
	else {
		delete instance.defaults.headers.common["Authorization"];
	}  
}

export default setAuthToken;