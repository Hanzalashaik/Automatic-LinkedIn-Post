import config from "config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import cron from "node-cron";

// Destructure configuration variables
const { API_KEY, TOKEN, ID } = config;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Array of technology-related terms
const techTerms = [
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
  "Blockchain",
  "Quantum Computing",
  "5G Technology",
  "Edge Computing",
  "Cybersecurity",
  "AI Ethics",
  "IoT",
  "Microservices",
  "Serverless Architecture",
];

// Queue to track recently used terms
const recentTermsQueue = [];
const maxRecentTerms = 5; // Adjust this number as needed

// Shuffle array function
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Function to get a random technology term that hasn't been used recently
const getRandomTechTerm = () => {
  let term;
  const availableTerms = techTerms.filter((t) => !recentTermsQueue.includes(t));

  if (availableTerms.length === 0) {
    // All terms have been used recently, reset the queue
    recentTermsQueue.length = 0;
    term = techTerms[Math.floor(Math.random() * techTerms.length)];
  } else {
    term = availableTerms[Math.floor(Math.random() * availableTerms.length)];
  }

  // Add the term to the queue and ensure it doesn't exceed the maxRecentTerms size
  recentTermsQueue.push(term);
  if (recentTermsQueue.length > maxRecentTerms) {
    recentTermsQueue.shift();
  }

  return term;
};

// Main function to generate content and post to LinkedIn
async function generateAndPostContent() {
  const term = getRandomTechTerm();
  const prompt = `Create a 400-character LinkedIn post on the latest in ${term}. Highlight its impact, key features, and future prospects. Include practical examples, success stories, and best practices. Use engaging language, emojis, and avoid hashtags. Ensure unique and current content each time. Title: ${term}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

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

    const postResponse = await axios.post(
      "https://api.linkedin.com/v2/ugcPosts",
      postData,
      { headers, timeout: 20000 }
    );

    if (postResponse.status !== 201) {
      throw new Error(
        `Error: ${postResponse.status} ${postResponse.statusText}`
      );
    }

    console.log("Successfully posted to LinkedIn:", postResponse.data);
  } catch (error) {
    console.error("Error posting to LinkedIn:", error);
  }
}

// Schedule the task to run every day at 12:00 PM
cron.schedule("0 12 * * *", () => {
  console.log("Running a task every day at 12:00 PM");
  generateAndPostContent();
});
