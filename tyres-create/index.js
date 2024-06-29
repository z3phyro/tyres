#!/usr/bin/env node
import { intro, outro, text, confirm, spinner } from "@clack/prompts";
import { initConfigs, initFeatureFlags, initTranslations } from "@z3phyro/tyres-core";
import fs from "fs";

intro("Initialize TyRes configuration");

// Ask for the project name
const projectName = await text({
  message: "Enter the name of your project",
  initialValue: "My project",
  validate: (value) => {
    if (value.length === 0) {
      return "Project name cannot be empty";
    }
  }
});

// Ask for the i18n folder
let i18nFolder = await text({
  message: "Enter the route to the i18n folder",
  initialValue: "src/i18n",
  validate: (value) => {
    const regex = new RegExp(/^(?:\.{1,2}\/)?(?:[a-zA-Z0-9_-]+\/)*$/);
    if (regex.test(value)) {
      return "Invalid path";
    }
  }
});

if (i18nFolder.at(-1) !== '/') {
  i18nFolder += '/';
}

// Ask for the feature flags folder
let featureFlagsFolder = await text({
  message: "Enter the route to the feature flags folder",
  initialValue: "src/feature-flags",
  validate: (value) => {
    const regex = new RegExp(/^(?:\.{1,2}\/)?(?:[a-zA-Z0-9_-]+\/)*$/);
    if (regex.test(value)) {
      return "Invalid path";
    }
  }
});

if (featureFlagsFolder.at(-1) !== '/') {
  featureFlagsFolder += '/';
}

// Ask for confirmation
const shouldContinue = await confirm({
  message: `Project Name: ${projectName}
Translations Path: ${i18nFolder}
Feature Flags Path: ${featureFlagsFolder}

Do you want to initialize TyRes with this values?`,
});

if (!shouldContinue) {
  outro("TyRes configuration initialization canceled");
  process.exit(0);
}
const s = spinner();
s.start("Initializing TyRes configuration");

const packageJsonPath = './package.json';

// Check if package.json exists
if (!fs.existsSync(packageJsonPath)) {
  outro('package.json not found in the current directory.');
  process.exit(1);
}

// Read the existing package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Modify scripts
packageJson.scripts = {
  ...packageJson.scripts,
  "tyres-ui": "PORT=8123 node ./node_modules/.bin/tyres-ui"
};

// Add new dependencies
packageJson.dependencies = {
  ...packageJson.dependencies,
  "@z3phyro/tyres-ui": "^0.1.11"
};

// Write the updated package.json back to the file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

initConfigs({
  projectName,
  translationsPath: i18nFolder,
  featureFlagsPath: featureFlagsFolder
});
initTranslations();
initFeatureFlags();

s.stop("TyRes configuration initialized successfully!");

outro("TyRes configuration initialized successfully! \n Please install your packages and run tyres-ui script")
