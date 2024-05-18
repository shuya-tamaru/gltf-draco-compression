const gltfPipeline = require("gltf-pipeline");
const fsExtra = require("fs-extra");
const path = require("path");

async function compressGltf() {
  const inputPath = path.resolve(__dirname, "statics/testModel.gltf");
  const outputPath = inputPath.replace(".gltf", "-draco.glb");

  const gltf = fsExtra.readJsonSync(inputPath);
  const options = {
    resourceDirectory: path.dirname(inputPath),
    dracoOptions: { compressionLevel: 10 },
  };

  try {
    const { glb } = await gltfPipeline.gltfToGlb(gltf, options);
    fsExtra.writeFileSync(outputPath, glb);
    console.log(`[draco-compression Fin] ${outputPath}`);
  } catch (err) {
    console.error("Error during Draco compression:", err);
  }
}

compressGltf();
