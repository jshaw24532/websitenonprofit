const urls = [
  "https://demowebsiteslinks.com/josephproject/assets/js/webpack-runtime.js",
  "f:/joseph project/html project/assets/js/webpack-runtime.js",
];
for (const u of urls) {
  const t = u.startsWith("http") ? await (await fetch(u)).text() : await import("fs").then(fs=>fs.readFileSync(u,"utf8"));
  const m = t.match(/r\.p="([^"]+)"/);
  console.log(u.includes("demowebsites") ? "LIVE" : "LOCAL", "publicPath:", m?.[1]);
}
