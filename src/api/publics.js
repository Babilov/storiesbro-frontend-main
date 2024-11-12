import axios from "axios";
import { API_URL } from "../constants/constatns";
const tokken = localStorage["token"];
// const [error, setError] = useState(false);

export const get_list = () => {
  axios.get(`${API_URL}api_communities/communities`, {
    headers: { Authorization: `Bearer ${tokken}` },
  });
};

export const add_public = (url, user, setError) => {
  axios
    .post(`${API_URL}api_communities/communities`, { url, user })

    .catch((error) => {
      console.error("Error during POST request:", error.response);
      setError(true);
    });
};

export const add_public_with_name = (name, user, setError) => {
  axios
    .post(`${API_URL}api_communities/communities`, { name, user })

    .catch((error) => {
      console.error("Error during POST request:", error.response);
      setError(true);
    });
};

export const get_statistic = (group_id, user_id) => {
  axios.get(`${API_URL}communities/statistics/${group_id}/${user_id}/`);
};
