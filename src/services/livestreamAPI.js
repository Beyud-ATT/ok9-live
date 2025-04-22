import axoisBase from "./axiosBase";

const endpoint = "/livestreams";

async function getHotLivestreams() {
  try {
    const res = await axoisBase.get(`${endpoint}/hot`);
    return res;
  } catch (error) {
    console.error("Error in getHotLivestreams:", error);
    throw error;
  }
}

async function getDetailLivestream(livestreamId) {
  try {
    const res = await axoisBase.get(`${endpoint}/detail/${livestreamId}`);
    return res;
  } catch (error) {
    console.error("Error in getDetailLivestream:", error);
    throw error;
  }
}

async function addBannedChat(data) {
  try {
    const res = await axoisBase.post(`${endpoint}/hidden-chat`, data);
    return res;
  } catch (error) {
    console.error("Error in addBannedChat:", error);
    throw error;
  }
}

async function getBannedChatList() {
  try {
    const res = await axoisBase.get(`${endpoint}/chat/me/hidden-users`);
    return res;
  } catch (error) {
    console.error("Error in getBannedChatList:", error);
    throw error;
  }
}

async function unBannedChat(data) {
  try {
    const res = await axoisBase.post(`${endpoint}/open-hidden-chat`, data);
    return res;
  } catch (error) {
    console.error("Error in unBannedChat:", error);
    throw error;
  }
}

async function checkChat(data) {
  try {
    const res = await axoisBase.get(`${endpoint}/check-chat`, { params: data });
    return res;
  } catch (error) {
    console.error("Error in checkChat:", error);
    throw error;
  }
}

async function idolRate(data) {
  try {
    const res = await axoisBase.post(`${endpoint}/rate`, data);
    return res;
  } catch (error) {
    console.error("Error in idolRate:", error);
    throw error;
  }
}

async function getMasterLink(params) {
  try {
    const res = await axoisBase.get(`${endpoint}/master-link`, { params });
    return res;
  } catch (error) {
    console.error("Error in getMasterLink:", error);
    throw error;
  }
}

export {
  getHotLivestreams,
  getDetailLivestream,
  addBannedChat,
  getBannedChatList,
  unBannedChat,
  checkChat,
  idolRate,
  getMasterLink,
};
