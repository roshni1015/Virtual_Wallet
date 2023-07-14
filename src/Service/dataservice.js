const token = localStorage.getItem("token");
// console.log(token);

export let configObjForaddNotes1 = {
  headers: {
    "ngrok-skip-browser-warning": true,
    Authorization: `Bearer ${token}`,
  },
};

const publicUrl = `https://a8e2-106-216-244-8.ngrok-free.app`;
export const login = `${publicUrl}/login`;
export const adminLogin = `${publicUrl}/adminLogin`;
export const adminUsers = `${publicUrl}/users`;
export const walletBalance = `${publicUrl}/getUserBalance`;
export const adminFundTransfer = `${publicUrl}/transferFund`;
export const Balance = `${publicUrl}/getWalletBalance`;
export const userAllHistory = `${publicUrl}/allHistory`;
// export const userAllHistory = `${publicUrl}/addedHistory`;
export const userSendHistory = `${publicUrl}/SendHistory`;
export const userAddedHistory = `${publicUrl}/userAddedHistory`;
export const userReceivedHistory = `${publicUrl}/userReceiveHistory`;

export const adminHistory = `${publicUrl}/adminHistory`;
export const Signup = `${publicUrl}/signup`;
export const History = `${publicUrl}/userAddedHistory`;
export const transfer = `${publicUrl}/transferMoney`;
export const All = `${publicUrl}/userAllHistory`;
export const Paid = `${publicUrl}/userSendHistory`;
export const Received = `${publicUrl}/userReceivedHistory`;
export const Added = `${publicUrl}/userAddedHistory`;
