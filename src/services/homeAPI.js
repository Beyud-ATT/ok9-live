import axoisBase from "./axiosBase";

const endpoint = "/home";

async function getNews() {
  try {
    const res = await axoisBase.get(`${endpoint}/new-infos`);
    return res;
  } catch (error) {
    console.error("Error in getNews:", error);
    throw error;
  }
}
async function getGeneralLinks() {
  try {
    const res = await axoisBase.get(`${endpoint}/meta-data`);
    return res;
  } catch (error) {
    console.error("Error in getGneralLinks:", error);
    throw error;
  }
}

export { getNews, getGeneralLinks };
