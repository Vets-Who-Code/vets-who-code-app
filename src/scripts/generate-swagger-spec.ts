import { writeFileSync } from "fs";
import { join } from "path";
import { getApiDocs } from "../swagger";

const spec = getApiDocs();
const outputPath = join(process.cwd(), "public", "swagger-spec.json");
writeFileSync(outputPath, JSON.stringify(spec, null, 2));
console.log("Swagger spec written to public/swagger-spec.json");
