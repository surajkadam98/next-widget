
import fs from 'fs'
import path from 'path'

const originalFilePath = "./lib/whitelabel.html";
const targetFilePath = "./build/whitelabel.html";
const embedOriginalFilePath = "./lib/js/viewfi-embed.js";
const embedTargetFilePath = "./build/static/js/viewfi-embed.js";
const originalLeaderBoardFilePath = "./lib/leaderboard.html";
const targetLeaderBoardFilePath = "./build/leaderboard.html";
const baseAppUrl = process.env.VITE_BASE_URL; // Replace with your actual base URL
const baseApiUrl = process.env.VITE_BACKEND_URL; // Replace with your actual base URL

fs.readFile(originalFilePath, "utf8", function (err, data) {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  let modifiedData = data.replace(/VITE_BASE_URL/g, baseAppUrl);
  modifiedData = modifiedData.replace(/VITE_BACKEND_URL/g, baseApiUrl);

  fs.writeFile(targetFilePath, modifiedData, "utf8", function (err) {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    // console.log("File has been written to", targetFilePath);
  });
});

fs.readFile(embedOriginalFilePath, "utf8", function (err, data) {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  let modifiedData = data.replace(/VITE_BASE_URL/g, baseAppUrl);

  // first create `static` dir
  const rootDir = path.join(process.cwd(), 'build')
  const staticDir = fs.mkdirSync(path.join(rootDir, 'static'), {recursive: true})
  // create `js` dir
  fs.mkdirSync(path.join(staticDir, 'js'), {recursive: true})


  fs.writeFile(embedTargetFilePath, modifiedData, "utf8", function (err) {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    // console.log("File has been written to", embedTargetFilePath);
  });
});

// copy leaderboard.html into build dir

fs.readFile(originalLeaderBoardFilePath, "utf8", function (err, data) {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  let modifiedData = data.replace(/VITE_BASE_URL/g, baseAppUrl);
  modifiedData = modifiedData.replace(/VITE_BACKEND_URL/g, baseApiUrl);

  fs.writeFile(targetLeaderBoardFilePath, modifiedData, "utf8", function (err) {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    // console.log("File has been written to", targetFilePath);
  });
});
