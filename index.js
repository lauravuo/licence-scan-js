const jsgl = require('js-green-licenses');
const https = require("https");
const { mkdirSync, existsSync, writeFileSync, copyFileSync, fstat } = require('fs');

const get = (url) => new Promise((resolve, reject) => {
  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      resolve(body)
    });
  });
});


const runCheck = async (path, verbose) => {
  const checker = new jsgl.LicenseChecker({ verbose });
  if (verbose) {
    checker.setDefaultHandlers();
  }
  const licenses = [];
  checker.on('non-green-license', (arg) => {
    licenses.push(arg);
  });
  checker.on('package.json', (arg) => {
    console.log(`Scanning ${arg}`);
  });
  checker.on('error', (err) => {
    console.log(err);
  });
  await checker.checkLocalDirectory(path);
  return licenses;
};

(async () => {
  const path = '.temp';

  if (!existsSync(path)) {
    mkdirSync(path);
  }

  copyFileSync('./package.json', `${path}/package.json`);

  // Report mode - list all licenses in report file
  if (process.argv[2] === 'report') {
    writeFileSync(
      `${path}/js-green-licenses.json`,
      JSON.stringify({ greenLicenses: [] })
    );

    const licenses = await runCheck(path);
    const reportPath = process.argv[3];
    writeFileSync(
      reportPath,
      licenses.reduce(
        (result, { packageName, version, licenseName }) =>
          `${result}\n${packageName}@${version} ${licenseName}`,
        ''
      )
    );
    console.log(`Licenses listed to ${reportPath}`);
  }

  const list = await get("https://gist.githubusercontent.com/lauravuo/587e44c99dad95663875a41d0eec9a3f/raw/10a9f76850a193565ea0a7cb33d30c0caedb58d5/js-green-licenses.json")
  writeFileSync(`${path}/js-green-licenses.json`, list)

  const licenses = await runCheck(path, true);
  if (licenses.length > 0) {
    licenses.map(({ packageName, version, licenseName }) =>
      console.log(
        `Found invalid license for ${packageName}@${version}: ${licenseName}`
      )
    );
    console.log('Check license terms for invalid licenses! Either');
    console.log('1) remove incompatible package');
    console.log('2) add license to greenLicenses');
    console.log('3) add package to exception list (packageAllowList)');
    process.exit(1);
  }
})();