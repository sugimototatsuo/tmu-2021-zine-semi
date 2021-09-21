function openLightbox(event) {
  const lightbox = new FsLightbox();
  const datum = d3.select(event.target).datum();
  // console.log(d3.select(event.target).datum());
  const id = datum.id;
  const pages = datum.pages;

  // set up props, like sources, types, events etc.
  lightbox.props.sources = d3
    .range(1, pages + 1)
    .map((d) => `zine/${d3.format("02d")(id)}/${d3.format("02d")(d)}.jpg`);
  // lightbox.props.onInit = () => console.log("Lightbox initialized!");
  console.log(id, lightbox.props);
  lightbox.open();
}

async function loadData() {
  const data = await d3.tsv("data/zine.tsv", d3.autoType);
  // console.log(data);

  const zine = d3
    .select("#zine-list")
    .selectAll("sl-card")
    .data(data)
    .join("sl-card")
    .classed("zine-overview", true);
  zine
    // .append("a")
    // .attr("href", (d, i) => `zine/${d3.format("02d")(i + 1)}/01.jpg`)
    .append("img")
    .attr("src", (d, i) => `images/${d3.format("02d")(i + 1)}.jpg`)
    .attr("alt", (d) => d.title)
    .attr("slot", "image")
    .on("click", (e) => {
      openLightbox(e);
    })
    .style('cursor', 'pointer');
  zine.append("strong").text((d) => d.title);
  zine.append("p").text((d) => d.name);
  zine.append("small").text((d) => d.description);
  const footer = zine.append("div").attr("slot", "footer");

  footer
    .append("sl-button")
    .attr("type", "primary")
    .attr("pill", "")
    .html(`<sl-icon name="book"></sl-icon> 読む`)
    .on("click", (e) => {
      openLightbox(e);
    });
}

loadData();
