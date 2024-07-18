import config from "config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import cron from "node-cron";

// Destructure configuration variables
const { API_KEY, TOKEN, ID } = config;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
const prompt = `Write a LinkedIn blog post about the latest advancements in ${words}, focusing on its impact, key features, and future prospects. Discuss how ${words} is revolutionizing the tech industry and provide insights into its practical applications. Include relevant examples, success stories, and best practices. Use engaging language and incorporate emojis to highlight key points and add a dynamic touch to the content. in 300 characters and every time generate new and latest content. Title: ${words}`;

const result = await model.generateContent(prompt);
const response = await result.response;
const text = await response.text();
// console.log(text);

const postData = {
  author: `urn:li:person:${ID}`,
  lifecycleState: "PUBLISHED",
  specificContent: {
    "com.linkedin.ugc.ShareContent": {
      shareCommentary: {
        text: text,
      },
      shareMediaCategory: "NONE",
    },
  },
  visibility: {
    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
  },
};

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

async function postToLinkedIn() {
  try {
    const response = await axios.post(
      "https://api.linkedin.com/v2/ugcPosts",
      postData,
      { headers, timeout: 10000 }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    console.log("Successfully posted to LinkedIn:", response.data);
  } catch (error) {
    console.error("Error posting to LinkedIn:", error);
  }
}

cron.schedule("0 1 * * *", () => {
  console.log("Running a task every day at 12:00 PM");
  postToLinkedIn();
});
