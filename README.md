# Automatic-LinkedIn-Post

This project schedules and posts a message to LinkedIn every day at 12:00 PM using Node.js, node-fetch, and node-cron.

## Features

1. Posts a predefined message to LinkedIn using the LinkedIn API.
2. Uses node-cron to schedule the task to run every day at 12:00 PM.
3. Includes error handling to ensure the reliability of the scheduled task.

## Prerequisites
1. Node.js (version 12.x or later)
2. A LinkedIn Developer account with necessary API permissions
3. LinkedIn API Key and Token


## Installation
1. Clone the repository:
```bash
git clone git@github.com:Hanzalashaik/Automatic-LinkedIn-Post
cd Automatic-LinkedIn-Post
```
2. Install the dependencies:    
```bash
npm install
```
3. Create a config file to store your API credentials (if you are using config module):
```bash
touch config/default.json

```

Add your LinkedIn API Key, Token, and other necessary details to the default.json file:
```bash
{
  "API_KEY": "your-google-generative-ai-api-key",
  "TOKEN": "your-linkedin-api-token",
  "ID": "your-linkedin-id"
}

```

## Usage
1. Run the script:
```bash
node index.js
```

The script will schedule a task to post to LinkedIn every day at 12:00 PM.


Feel free to modify this template according to your specific needs and details.






