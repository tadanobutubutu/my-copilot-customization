const fs = require("fs");
const path = require("path");
const [assignmentId, displayName, filename, type] = process.argv.slice(2);
const repoRoot = path.resolve(__dirname, "../../../../");
const configPath = path.join(repoRoot, "config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const assignment = config.assignments.find((a) => a.id === assignmentId);
if (!assignment) {
  console.error(`Error: Assignment "${assignmentId}" not found`);
  process.exit(1);
}
if (!assignment.attachments) assignment.attachments = [];
assignment.attachments.push({ name: displayName, file: filename, type: type });
fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
console.log(`Added "${displayName}" to "${assignmentId}"`);
