import axios from "axios";

const logToBackend = async (message, level = "INFO") => {
  await axios
    .post("/api/logs/", { message: `[${level}] ${message}` })
    .catch(console.error);
};

export default logToBackend;
