import axios from "axios";

export const axiosInst = axios.create({
	baseURL: "https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/",
	withCredentials: false,
});
