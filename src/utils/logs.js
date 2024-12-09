import axios from "axios";

const logToBackend = (message, level = "INFO") => {
  axios
    .post("/api/logs/", { message: `[${level}] ${message}` })
    .catch(console.error);
};

export default logToBackend;
