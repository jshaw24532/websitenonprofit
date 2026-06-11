const urls = [
  "https://demowebsiteslinks.com/josephproject/",
  "https://demowebsiteslinks.com/josephproject/assets/js/layout.js",
  "https://demowebsiteslinks.com/josephproject/assets/js/main-app.js",
];

for (const url of urls) {
  const r = await fetch(url);
  const t = await r.text();
  console.log("\n===", url, "status", r.status, "===");
  if (url.endsWith("/")) {
    const css = t.match(/href="([^"]*main\.css[^"]*)"/)?.[1];
    const layout = t.match(/src="([^"]*layout\.js[^"]*)"/)?.[1];
    console.log("CSS:", css);
    console.log("layout.js:", layout);
    const gov = t.indexOf("Government");
    console.log("Gov button snippet:", t.slice(gov, gov + 400));
  } else {
    console.log("has josephproject/government:", t.includes("josephproject/government"));
    console.log("has /government/ (no prefix):", /[^"]\/government\//.test(t));
  }
}
