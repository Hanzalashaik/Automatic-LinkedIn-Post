const randomWords = () => {
  const arr = [
    "Full Stack Development",
    "MERN stack",
    "Docker",
    "DevOps",
    "Kubernetes",
    "Generative AI",
    "Node.js",
    "React.js",
    "MongoDB",
    "Express.js",
    "ChatGPT",
  ];
  return arr[Math.floor(Math.random() * arr.length)];
};
const words = randomWords();
const prompt = `Write a LinkedIn blog post about the latest advancements in ${words}, focusing on its impact, key features, and future prospects. Discuss how ${words} is revolutionizing the tech industry and provide insights into its practical applications. Include relevant examples, success stories, and best practices. Use engaging language and incorporate emojis to highlight key points and add a dynamic touch to the content. in 1000 characters and every time generate new and latest content. Title: ${words}`;

// const result = await model.generateContent(prompt);
// const response = await result.response;
// const text = await response.text();
// console.log(text);

























// import axios from "axios";
// import config from "config";
// import cron from "node-cron";

// // Constants
// const token = config.get("TOKEN");
// const authorID = config.get("ID");
// const obj = [
//   {
//     title:
//       "💡 Exciting News Alert! Have you heard about the latest breakthroughs in Devin AI?",
//     content:
//       "Devin AI, the cutting-edge artificial intelligence platform, has recently unveiled a series of groundbreaking advancements that are poised to revolutionize various industries. One of the most notable breakthroughs is the development of advanced natural language processing (NLP) algorithms that significantly enhance the system's ability to understand and generate human-like text. These NLP capabilities enable Devin AI to engage in more nuanced and contextually relevant conversations, making it a valuable tool for tasks ranging from customer service to content generation.\n\nFurthermore, Devin AI has made significant strides in the field of computer vision, leveraging state-of-the-art deep learning techniques to achieve remarkable accuracy in image recognition and analysis. This breakthrough enables the AI system to not only identify objects and scenes with unprecedented precision but also to extract valuable insights from visual data, opening up new possibilities in fields such as healthcare, autonomous driving, and security.",
//     image: "https://img.youtube.com/vi/fjHtjT7GO1c/maxresdefault.jpg",
//     hashtags: "#AI #Innovation",
//   },
//   {
//     title:
//       "🚀 Innovation knows no bounds! Learn about the cutting-edge developments in blockchain technology",
//     content:
//       "Innovation knows no bounds! Learn about the cutting-edge developments in blockchain technology. With its decentralized and secure nature, blockchain continues to push the boundaries of what's possible in various industries. One of the most exciting advancements is the rise of decentralized finance (DeFi), which leverages blockchain technology to create financial instruments and services without traditional intermediaries. DeFi offers opportunities for financial inclusion, lower transaction costs, and enhanced transparency, revolutionizing how people access and manage their finances.\n\nFurthermore, blockchain technology is evolving beyond cryptocurrencies and DeFi into other sectors such as supply chain management, healthcare, and digital identity. Its immutable and transparent ledger system provides a trusted framework for tracking and verifying transactions and data, leading to increased efficiency, security, and accountability. As blockchain continues to mature and integrate with existing systems, its potential to reshape industries and drive innovation knows no bounds.",
//     image:
//       "https://editor.analyticsvidhya.com/uploads/49174Blockchain-Technology.png",
//     hashtags: "#Blockchain #TechTrends",
//   },

// ];

// const MAX_RETRIES = 3;
// let seconds = 86400;
// const RETRY_DELAY = 5000; // 5 seconds delay between retries
// // Function to post LinkedIn share with retry logic
// const postLinkedInShare = async (
//   image,
//   title,
//   content,
//   hashtags,
//   retryCount = 0cd
// ) => {
//   try {
//     let myContent = ${title} \n\n${content} \n\n${hashtags} \n\n ${image};

//     const data = {
//       content: {
//         contentEntities: [
//           { entityLocation: image, thumbnails: [{ resolvedUrl: image }] },
//         ],
//         title: title,
//       },
//       distribution: { linkedInDistributionTarget: {} },
//       owner: urn:li:person:${authorID},
//       subject: title,
//       text: { text: myContent },
//     };

//     const response = await axios.post(
//       "https://api.linkedin.com/v2/shares",
//       data,
//       {
//         headers: {
//           Authorization: Bearer ${token},
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log(JSON.stringify(response.data));
//   } catch (error) {
//     if (retryCount < MAX_RETRIES && error.code === "EAI_AGAIN") {
//       console.log(Retry attempt ${retryCount + 1} after ${RETRY_DELAY}ms);
//       await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
//       await shareNextLinkedInPost(
//         image,
//         title,
//         content,
//         hashtags,
//         retryCount + 1
//       );
//     } else {
//       console.error(error.response ? error.response.data : error);
//     }
//   }
// };

// // Function to share the next LinkedIn post
// let postIndex = 0; // Variable to track the current post index
// let intervalId; // Variable to hold the interval ID

// const shareNextLinkedInPost = async () => {
//   const post = obj[postIndex];
//   if (post) {
//     await postLinkedInShare(
//       post.image,
//       post.title,
//       post.content,
//       post.hashtags
//     );
//     postIndex = (postIndex + 1) % obj.length; // Increment index and wrap around
//     if (postIndex === 0) {
//       clearInterval(intervalId); // Stop interval if all posts have been shared
//     }
//   }
// };

// // Set interval for sharing posts every 2 minutes
// intervalId = setInterval(async () => {
//   console.log("Running scheduled LinkedIn share task...");
//   await shareNextLinkedInPost();
// }, seconds * 1000); // Interval in milliseconds (2 minutes)