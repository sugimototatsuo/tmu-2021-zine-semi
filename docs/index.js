function chunkArray(array, size) {
  if (array.length <= size) {
    return [array]
  }
  return [array.slice(0, size), ...chunkArray(array.slice(size), size)]
}

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
  // console.log(chunkArray(data, 4));

  const columns = d3.select("#zine-list")
    .selectAll('div')
    .data(chunkArray(data, 4))
    .join('div')
    .classed("columns", true);

  const column = columns.selectAll("div")
    .data(d => d)
    .join("div")
    .classed("column", true);

  const card = column.append('div')
    .classed("card", true);

  card.append('div')
    .classed('card-image', true)
    .append('figure')
    .classed('image', true)
    .classed('is-square', true)
    .append("img")
    .attr("src", (d) => `images/${d3.format("02d")(d.id)}.jpg`)
    .attr("alt", (d) => d.title)
    .classed('zine-thumbnail', true)
    .on("click", (e) => {
      openLightbox(e);
    })
    .style('cursor', 'pointer');

  const cardContent = card.append('div')
    .classed('card-content', true)
    .append('div')
    .classed('content', true)
  cardContent.append("strong").text((d) => d.title);
  cardContent.append("p").text((d) => d.name);
  cardContent.append("small").text((d) => d.description);

  card.append('footer')
    .classed('card-footer', true)
    .append('a')
    .classed('card-footer-item', true)
    .attr('href', '#')
    .text('読む')
    .on("click", (e) => {
      openLightbox(e);
    });

  // const zine = d3
  //   .select("#zine-list")
  //   .selectAll("sl-card")
  //   .data(data)
  //   .join("sl-card")
  //   .classed("zine-overview", true)
  //   .classed("card", true);
  // zine
  //   // .append("a")
  //   // .attr("href", (d, i) => `zine/${d3.format("02d")(i + 1)}/01.jpg`)
  //   .append("img")
  //   .attr("src", (d, i) => `images/${d3.format("02d")(i + 1)}.jpg`)
  //   .attr("alt", (d) => d.title)
  //   .attr("slot", "image")
  //   .on("click", (e) => {
  //     openLightbox(e);
  //   })
  //   .style('cursor', 'pointer');
  // zine.append("strong").text((d) => d.title);
  // zine.append("p").text((d) => d.name);
  // zine.append("small").text((d) => d.description);
  // const footer = zine.append("div").attr("slot", "footer");

  // footer
  //   .append("sl-button")
  //   .attr("type", "primary")
  //   .attr("pill", "")
  //   .html(`<sl-icon name="book"></sl-icon> 読む`)
  //   .on("click", (e) => {
  //     openLightbox(e);
  //   });
}

loadData();
