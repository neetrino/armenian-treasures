import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([{
    extends: [...nextCoreWebVitals, ...nextTypescript],

    rules: {
        "import/no-default-export": "off",

        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
        }],

        // React 19 compiler rules — pre-existing patterns; revisit separately from Next 16 upgrade
        "react-hooks/set-state-in-effect": "off",
        "react-hooks/static-components": "off",
        "react-hooks/purity": "off",
        "react-hooks/use-memo": "off",
    },
}]);