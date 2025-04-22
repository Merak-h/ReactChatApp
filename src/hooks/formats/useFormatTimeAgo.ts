// import { useEffect, useState } from "react";
// import { Timestamp } from 'firebase/firestore';

// const getFormatted = (unixTime: Timestamp): { text: string; nextUpdateIn: Timestamp } => {
//   const now = Math.floor(Date.now() / 1000);
//   const diff = now - unixTime;

//   if (diff < 60) {
//     return { text: "今", nextUpdateIn: 60 - diff };
//   } else if (diff < 3600) {
//     const minutes = Math.floor(diff / 60);
//     return { text: `${minutes}分前`, nextUpdateIn: 60 - (diff % 60) };
//   } else if (diff < 86400) {
//     const hours = Math.floor(diff / 3600);
//     return { text: `${hours}時間前`, nextUpdateIn: 3600 - (diff % 3600) };
//   } else if (diff < 2592000) {
//     const days = Math.floor(diff / 86400);
//     return { text: `${days}日前`, nextUpdateIn: 86400 - (diff % 86400) };
//   } else if (diff < 31536000) {
//     const months = Math.floor(diff / 2592000);
//     return { text: `${months}ヶ月前`, nextUpdateIn: 2592000 - (diff % 2592000) };
//   } else {
//     const years = Math.floor(diff / 31536000);
//     return { text: `${years}年前`, nextUpdateIn: 31536000 - (diff % 31536000) };
//   }
// };

// export const useFormatTimeAgo = (timestamp: Timestamp) => {
//   const [ago, setAgo] = useState(() => getFormatted(timestamp).text);

//   useEffect(() => {
//     const { text, nextUpdateIn } = getFormatted(timestamp);
//     setAgo(text);

//     const timer = setTimeout(() => {
//       const updated = getFormatted(timestamp);
//       setAgo(updated.text);
//     }, nextUpdateIn * 1000);

//     return () => clearTimeout(timer);
//   }, [timestamp, ago]);

//   return { ago };
// };


import { useEffect, useState } from "react";
import { Timestamp } from 'firebase/firestore';

const getFormatted = (timestamp: Timestamp | null): { text: string; nextUpdateIn: number } => {
  if(timestamp === null){
    return { text:  "", nextUpdateIn: 31536000 }
  }
  const nowSec = Math.floor(Date.now() / 1000);
  const timestampSec = timestamp.seconds;
  const diff = nowSec - timestampSec;

  if (diff < 60) {
    return { text: "今", nextUpdateIn: 60 - diff };
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return { text: `${minutes}分前`, nextUpdateIn: 60 - (diff % 60) };
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return { text: `${hours}時間前`, nextUpdateIn: 3600 - (diff % 3600) };
  } else if (diff < 2592000) {
    const days = Math.floor(diff / 86400);
    return { text: `${days}日前`, nextUpdateIn: 86400 - (diff % 86400) };
  } else if (diff < 31536000) {
    const months = Math.floor(diff / 2592000);
    return { text: `${months}ヶ月前`, nextUpdateIn: 2592000 - (diff % 2592000) };
  } else {
    const years = Math.floor(diff / 31536000);
    return { text: `${years}年前`, nextUpdateIn: 31536000 - (diff % 31536000) };
  }
};

export const useFormatTimeAgo = (timestamp: Timestamp | null) => {
  const [ago, setAgo] = useState(() => getFormatted(timestamp).text);

  useEffect(() => {
    const { text, nextUpdateIn } = getFormatted(timestamp);
    setAgo(text);

    const timer = setTimeout(() => {
      const updated = getFormatted(timestamp);
      setAgo(updated.text);
    }, nextUpdateIn * 1000);

    return () => clearTimeout(timer);
  }, [timestamp]);

  return { ago };
};
