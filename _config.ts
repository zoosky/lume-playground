import lume from "lume/mod.ts";

const site = lume(
    {
        src: "./src",
        dest: "./output",
        location: new URL("https://example.com")
    }
);
site.copy("assets");

export default site;
